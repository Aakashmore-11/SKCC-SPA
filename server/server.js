const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary');
const CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage || require('multer-storage-cloudinary');
const multer = require('multer');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('SKCC Database Tied & Connected'))
  .catch(err => console.error('DB Connection Failed:', err));

// --- MODELS ---
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Admin' }
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', UserSchema);

const ContentSchema = new mongoose.Schema({
  instituteInfo: { type: Object, default: {} },
  courses: { type: Array, default: [] },
  staff: { type: Array, default: [] },
  gallery: { type: Array, default: [] },
  toppers: { type: Array, default: [] },
  submissions: { type: Array, default: [] }
});

const Content = mongoose.model('Content', ContentSchema);

// --- CLOUDINARY CONFIG ---
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'skcc_v2',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1200, crop: 'limit', quality: 'auto', fetch_format: 'auto' }]
  },
});
const upload = multer({ storage: storage });

// --- MIDDLEWARE ---
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Admin access denied' });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Session expired or invalid' });
  }
};

// --- ROUTES ---

// 0. Content Routes
// Get All Content (Public)
app.get('/api/content', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = await Content.create({}); // Create default if empty
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching content', error: err.message });
  }
});

// Update Content (Protected)
app.put('/api/content', authenticate, async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content();
    }

    // Update fields if provided
    if (req.body.instituteInfo) content.instituteInfo = req.body.instituteInfo;
    if (req.body.courses) content.courses = req.body.courses;
    if (req.body.staff) content.staff = req.body.staff;
    if (req.body.gallery) content.gallery = req.body.gallery;
    if (req.body.toppers) content.toppers = req.body.toppers;
    if (req.body.submissions) content.submissions = req.body.submissions;

    await content.save();
    res.json({ message: 'Content updated successfully', content });
  } catch (err) {
    res.status(500).json({ message: 'Error updating content', error: err.message });
  }
});

// 1. Secure Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Identity not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ accessToken: token, role: user.role, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Auth Failure', error: err.message });
  }
});

// 2. Image Upload (Protected)
app.post('/api/admin/upload', authenticate, upload.single('image'), (req, res) => {
  console.log('--- Upload Triggered ---');
  if (!req.file) {
    console.log('Upload Failed: No file received');
    return res.status(400).json({ message: 'No file received' });
  }
  const imageUrl = req.file.path || req.file.url || req.file.secure_url;
  console.log('Cloudinary Upload Success:', imageUrl);
  res.json({ url: imageUrl });
});

// 3. Verify Token (Protected Route Check)
app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false, message: 'No token provided' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, role: decoded.role });
  } catch (err) {
    res.status(401).json({ valid: false, message: 'Token expired or invalid' });
  }
});

// 4. Seed Root Admin (Internal)
// Removed public seeding for security. Run manually if needed or restrict to localhost.

const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'dist', 'index.html')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SKCC Secure Core listening on port ${PORT}`));


