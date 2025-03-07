const express = require('express');
const cors = require('cors');
const app = express();

// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:4200', // URL của front-end Angular
    credentials: true
}));

// Middleware để parse JSON
app.use(express.json());

// Route test
app.get('/api/test', (req, res) => {
    res.json({ message: 'Kết nối thành công với back-end!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên port ${PORT}`);
});
