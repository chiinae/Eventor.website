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
const Event = require('./models/Event');

// Middleware xác thực JWT token
const authenticateToken = (req, res, next) => {
  console.log('=== Starting token authentication ===');
  console.log('Headers:', req.headers);
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Extracted token:', token);

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ 
      success: false,
      message: 'Không tìm thấy token xác thực' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ 
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn' 
      });
    }
    
    console.log('Decoded token:', decoded);
    
    // Gán thông tin user vào request
    req.user = {
      userId: decoded.userId
    };
    
    console.log('User in request:', req.user);
    next();
  });
};

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

// API lấy user theo ID (endpoint cụ thể nhất)
app.get('/api/users/id/:_id', authenticateToken, async (req, res) => {
  try {
    console.log('=== Getting user by ID ===');
    console.log('Params:', req.params);
    console.log('User from token:', req.user);
    console.log('Database name:', mongoose.connection.db.databaseName);
    
    if (!req.params._id) {
      console.log('No ID provided in params');
      return res.status(400).json({
        success: false,
        message: 'Thiếu ID người dùng'
      });
    }

    console.log('Attempting to find user with ID:', req.params._id);
    console.log('Collection name:', User.collection.collectionName);

    // Kiểm tra xem ID có đúng định dạng MongoDB ObjectId không
    if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
      console.log('Invalid MongoDB ObjectId:', req.params._id);
      return res.status(400).json({
        success: false,
        message: 'ID người dùng không hợp lệ'
      });
    }

    const user = await User.findById(req.params._id).select('-password');
    console.log('Database query result:', user);
    
    if (!user) {
      console.log('User not found with ID:', req.params._id);
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy user' 
      });
    }

    // Chuyển đổi sang plain object và đảm bảo _id là string
    const userObj = user.toObject();
    userObj._id = userObj._id.toString();

    console.log('Found user:', userObj);
    
    // Trả về response với success và user
    res.json({
      success: true,
      message: 'Lấy thông tin user thành công',
      user: userObj
    });
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ 
      success: false,
      message: 'Lỗi server', 
      error: error.message 
    });
  }
});

// API lấy user theo email (endpoint cụ thể)
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

// API lấy tất cả users (endpoint chung)
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

// API lấy thông tin user theo email (endpoint chung nhất)
app.get('/api/users/:email', authenticateToken, async (req, res) => {
  try {
    const { email } = req.params;

    // Kiểm tra quyền truy cập
    if (req.user.userId.toString() !== email) {
      return res.status(403).json({ message: 'Không có quyền truy cập thông tin này' });
    }

    const user = await User.findOne({ email }).select('-password');
    
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
        
        // Log thông tin request
        console.log('Login attempt:', { email });

        // Tìm user trong collection 'user'
        const user = await User.findOne({ email });
        
        // Log kết quả tìm kiếm
        console.log('Found user:', {
            _id: user?._id,
            email: user?.email,
            username: user?.username
        });

        if (!user) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        // Tạo token với _id
        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Chuyển đổi user document thành plain object
        const userObj = user.toObject();
        
        // Đảm bảo _id là string
        userObj._id = userObj._id.toString();

        // Log response data
        console.log('Sending response:', {
            _id: userObj._id,
            email: userObj.email,
            username: userObj.username
        });

        // Trả về response với đầy đủ thông tin
        res.json({
            success: true,
            message: 'Đăng nhập thành công',
            token,
            user: userObj
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Lỗi server', 
            error: error.message 
        });
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

//Chỉnh sửa tài khoản user

// API cập nhật user
app.put('/api/update', async (req, res) => {
  try {
    const { email, username, phone, dateOfBirth } = req.body;

    // Tìm user theo ID và cập nhật
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { username, phone, dateOfBirth },
      { new: true } // Trả về user đã cập nhật
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User không tồn tại' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi cập nhật user', error });
  }
});

// API cập nhật user theo ID
app.put('/api/users/id/:_id', authenticateToken, async (req, res) => {
  try {
    console.log('=== Updating user by ID ===');
    console.log('Params:', req.params);
    console.log('Body:', req.body);
    console.log('User from token:', req.user);
    
    if (!req.params._id) {
      console.log('No ID provided in params');
      return res.status(400).json({
        success: false,
        message: 'Thiếu ID người dùng'
      });
    }

    // Kiểm tra xem ID có đúng định dạng MongoDB ObjectId không
    if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
      console.log('Invalid MongoDB ObjectId:', req.params._id);
      return res.status(400).json({
        success: false,
        message: 'ID người dùng không hợp lệ'
      });
    }

    // Tìm và cập nhật user
    const updatedUser = await User.findByIdAndUpdate(
      req.params._id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      console.log('User not found with ID:', req.params._id);
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }

    // Chuyển đổi sang plain object và đảm bảo _id là string
    const userObj = updatedUser.toObject();
    userObj._id = userObj._id.toString();

    console.log('Updated user:', userObj);

    res.json({
      success: true,
      message: 'Cập nhật thông tin user thành công',
      user: userObj
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
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

// API kiểm tra tất cả users
app.get('/api/debug/users', async (req, res) => {
  try {
    console.log('=== Checking all users ===');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Collection:', User.collection.collectionName);
    
    const users = await User.find({}).lean();
    console.log('Total users found:', users.length);
    console.log('Users:', users);
    
    res.json({
      success: true,
      total: users.length,
      users: users
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});
// API lấy event theo ID
app.get('/api/event/:id', async (req, res) => {
  try {
      const eventId = req.params.id;
      const event = await Event.findOne({ id: eventId });
      
      if (!event) {
          return res.status(404).json({ 
              message: 'Không tìm thấy event',
              requestedId: eventId
          });
      }
      
      res.json({
          id: event.id,
          _id: event._id,
          event_name: event.event_name,
          hour_start: event.hour_start,
          start_date: event.start_date,
          location: event.location,
          price: event.price,
          tickets: event.tickets,
          event_image: event.event_image,
          description: event.description,
          category_id: event.category_id,
          status: event.status,
          max_participant: event.max_participant,
          current_participant: event.current_participant,
          created_at: event.created_at,
          format: event.format,
          organizer_id: event.organizer_id
      });
  } catch (error) {
      res.status(500).json({ 
          message: 'Lỗi server',
          error: error.message
      });
  }
});

// API lấy tất cả events
app.get('/api/event', async (req, res) => {
  try {
      console.log('Đang kết nối tới database:', mongoose.connection.db.databaseName);
      console.log('Đang lấy danh sách event từ collection:', Event.collection.collectionName);
      
      const events = await Event.find({}).lean();
      
      console.log('Kết quả truy vấn raw:', events);
      console.log('Số lượng event tìm thấy:', events.length);
      
      // Log chi tiết từng event và id của nó
      events.forEach((event, index) => {
          console.log(`Event ${index + 1}:`, {
              id: event.id,
              event_name: event.event_name,
              hour_start: event.hour_start,
              start_date: event.start_date,
              location: event.location,
              price: event.price,
              tickets: event.tickets,
              event_image: event.event_image,
              description: event.description,
              category_id: event.category_id,
              status: event.status,
              max_participant: event.max_participant,
              current_participant: event.current_participant,
              created_at: event.created_at,
              format: event.format,
              organizer_id: event.organizer_id,
              _id: event._id
          });
      });

      res.json({
          total: events.length,
          events: events
      });
  } catch (error) {
      console.error('Lỗi khi lấy danh sách events:', error);
      res.status(500).json({ 
          message: 'Lỗi server', 
          error: error.message,
          stack: error.stack 
      });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên port ${PORT}`);
});

