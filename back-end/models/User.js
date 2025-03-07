const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { 
  timestamps: true,
  // Chỉ định rõ collection name
  collection: 'user' 
});

// Log để kiểm tra model được tạo
console.log('Model name:', mongoose.model('User', userSchema).collection.name);

module.exports = mongoose.model('User', userSchema); 