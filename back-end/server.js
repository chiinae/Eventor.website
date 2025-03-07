const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Kết nối MongoDB thành công');
    console.log('Tên database hiện tại:', mongoose.connection.db.databaseName);
  })
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Import User Model
const User = require('./models/User');

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
        console.log('Thông tin đăng nhập nhận được:', { email, password }); // Log để kiểm tra

        // Tìm user
        const user = await User.findOne({ email });
        console.log('User tìm thấy:', user); // Log để kiểm tra user và mật khẩu đã mã hóa

        if (!user) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        // So sánh mật khẩu
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log('Kết quả so sánh mật khẩu:', isValidPassword); // Log để kiểm tra kết quả so sánh

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        // Tạo JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
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
                role: user.role
            }
        });
    } catch (error) {
        console.error('Lỗi server:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên port ${PORT}`);
});
