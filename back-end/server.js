const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Kết nối MongoDB thành công');
    console.log('Tên database hiện tại:', mongoose.connection.db.databaseName);
  })
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Import User Model
const User = require('./models/User');
const Banner = require('./models/Banner');

// Cấu hình nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API đang hoạt động' });
});

// API lấy tất cả users
app.get('/api/users', async (req, res) => {
    try {
        console.log('Đang truy vấn database:', mongoose.connection.db.databaseName);
        const users = await User.find({}, '-password');
        console.log('Số lượng users tìm thấy:', users.length);
        console.log('Danh sách users:', users);
        res.json(users);
    } catch (error) {
        console.error('Lỗi khi lấy users:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// API lấy user theo email
app.get('/api/users/email/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }, '-password');
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy user' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// API đăng ký
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log('Đăng ký user mới:', { username, email }); // Log để debug

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email hoặc username đã tồn tại' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        console.error('Lỗi đăng ký:', error); // Log lỗi
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});

// API đăng nhập
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Đăng nhập thành công',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phone: user['phone'],
                dateOfBirth: user.dateOfBirth,
                createdAt: user.createdAt,
                membershipType: user.membershipType,
                membershipExpiry: user.membershipExpiry,
                eventsJoined: user.eventsJoined,
                eventsCreated: user.eventsCreated
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// Thêm API kiểm tra user
app.get('/api/check-user/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        console.log('Thông tin user:', {
            email: user.email,
            passwordHashed: user.password // Xem mật khẩu đã mã hóa
        });
        res.json({
            exists: !!user,
            passwordHashed: user ? user.password : null
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// API tạo user test
app.post('/api/create-test-user', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash('123456', 10);
        const testUser = new User({
            username: 'test',
            email: 'test@example.com',
            password: hashedPassword
        });
        await testUser.save();
        res.json({ message: 'Tạo user test thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// Middleware xác thực token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Không tìm thấy token xác thực' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token không hợp lệ' });
    }
    req.user = user;
    next();
  });
};

// API cập nhật thông tin user
app.put('/api/users/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    
    // Kiểm tra xem user có quyền cập nhật không
    if (req.user.userId !== userId) {
      return res.status(403).json({ message: 'Không có quyền cập nhật thông tin này' });
    }

    // Loại bỏ các trường không cho phép cập nhật
    delete updateData.email;
    delete updateData.password;
    delete updateData.id;
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, select: '-password' }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }

    // Log để debug
    console.log('Đã cập nhật user:', {
      id: updatedUser._id,
      ...updateData
    });

    res.json({
      message: 'Cập nhật thông tin thành công',
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser['phone'],
        dateOfBirth: updatedUser.dateOfBirth,
        createdAt: updatedUser.createdAt,
        membershipType: updatedUser.membershipType,
        membershipExpiry: updatedUser.membershipExpiry,
        eventsJoined: updatedUser.eventsJoined,
        eventsCreated: updatedUser.eventsCreated
      }
    });
  } catch (error) {
    console.error('Lỗi cập nhật user:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// API lấy thông tin user
app.get('/api/users/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Kiểm tra quyền truy cập
    if (req.user.userId !== userId) {
      return res.status(403).json({ message: 'Không có quyền truy cập thông tin này' });
    }

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user['phone'],
        dateOfBirth: user.dateOfBirth,
        createdAt: user.createdAt,
        membershipType: user.membershipType,
        membershipExpiry: user.membershipExpiry,
        eventsJoined: user.eventsJoined,
        eventsCreated: user.eventsCreated
      }
    });
  } catch (error) {
    console.error('Lỗi lấy thông tin user:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// API gửi email reset password
app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Email không tồn tại trong hệ thống' });
    }

    // Tạo token reset password (hết hạn sau 1 giờ)
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Lưu token và thời gian hết hạn vào database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 giờ
    await user.save();

    // Tạo link reset password
    const resetLink = `http://localhost:4200/reset-password?token=${resetToken}`;

    // Gửi email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Đặt lại mật khẩu Eventor',
      html: `
        <h1>Yêu cầu đặt lại mật khẩu</h1>
        <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản Eventor.</p>
        <p>Vui lòng click vào link bên dưới để đặt lại mật khẩu:</p>
        <a href="${resetLink}">Đặt lại mật khẩu</a>
        <p>Link này sẽ hết hạn sau 1 giờ.</p>
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email đặt lại mật khẩu đã được gửi' });

  } catch (error) {
    console.error('Lỗi gửi email:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API xác thực token reset password
app.get('/api/reset-password/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }

    res.json({ message: 'Token hợp lệ' });

  } catch (error) {
    res.status(400).json({ message: 'Token không hợp lệ' });
  }
});

// API đặt lại mật khẩu mới
app.post('/api/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Cập nhật mật khẩu và xóa token reset
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Đặt lại mật khẩu thành công' });

  } catch (error) {
    res.status(400).json({ message: 'Token không hợp lệ' });
  }
});

// API tạo banner mới
app.post('/api/banner', async (req, res) => {
    try {
        console.log('Dữ liệu banner nhận được:', req.body);
        const { id, title, link, start_date, end_date, status, imageUrl } = req.body;

        // Kiểm tra banner đã tồn tại
        const existingBanner = await Banner.findOne({ id });
        if (existingBanner) {
            console.log('Banner đã tồn tại:', id);
            return res.status(400).json({ message: 'Banner đã tồn tại' });
        }

        const banner = new Banner({
            id,
            title,
            link,
            start_date,
            end_date,
            status: status || 'active',
            imageUrl
        });

        const savedBanner = await banner.save();
        console.log('Đã lưu banner thành công:', savedBanner);
        res.status(201).json(savedBanner);
    } catch (error) {
        console.error('Lỗi khi tạo banner:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});

// API lấy tất cả banner
app.get('/api/banner', async (req, res) => {
    try {
        console.log('Đang kết nối tới database:', mongoose.connection.db.databaseName);
        console.log('Đang lấy danh sách banner từ collection:', Banner.collection.collectionName);
        
        const banners = await Banner.find({}).lean();
        
        console.log('Kết quả truy vấn raw:', banners);
        console.log('Số lượng banner tìm thấy:', banners.length);
        
        // Log chi tiết từng banner
        banners.forEach((banner, index) => {
            console.log(`Banner ${index + 1}:`, {
                id: banner.id,
                _id: banner._id,
                title: banner.title,
                imageUrl: banner.imageUrl,
                status: banner.status
            });
        });

        res.json({
            total: banners.length,
            banners: banners
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách banner:', error);
        res.status(500).json({ 
            message: 'Lỗi server', 
            error: error.message,
            stack: error.stack 
        });
    }
});

// API lấy banner theo ID
app.get('/api/banner/:id', async (req, res) => {
    try {
        const bannerId = req.params.id;
        console.log('Đang tìm banner với ID:', bannerId);
        
        const banner = await Banner.findOne({ id: bannerId });
        
        console.log('Kết quả tìm kiếm:', banner);
        
        if (!banner) {
            console.log('Không tìm thấy banner:', bannerId);
            return res.status(404).json({ 
                message: 'Không tìm thấy banner',
                requestedId: bannerId 
            });
        }
        
        console.log('Đã tìm thấy banner:', banner);
        res.json(banner);
    } catch (error) {
        console.error('Lỗi khi lấy banner theo ID:', error);
        res.status(500).json({ 
            message: 'Lỗi server',
            error: error.message,
            requestedId: req.params.id
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên port ${PORT}`);
});

