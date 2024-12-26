const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdir(uploadsDir, { recursive: true })
  .then(() => console.log('Uploads directory is ready.'))
  .catch((err) => console.error('Error creating uploads directory:', err));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB per file
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type. Only images are allowed.'));
  },
});

// File path for posts data
const postsFilePath = path.join(__dirname, 'posts.json');

// Load posts from JSON file
const loadPosts = async () => {
  try {
    const data = await fs.readFile(postsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
};

// Save posts to JSON file
const savePosts = async (posts) => {
  try {
    await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error('Error saving posts:', error);
  }
};

// API to get all posts
app.get('/posts', async (req, res) => {
  const posts = await loadPosts();
  res.json(posts);
});

// API to create a new post
app.post('/posts', upload.single('image'), async (req, res) => {
  try {
    const { description } = req.body;
    if (!description || description.trim() === '') {
      return res.status(400).send('Description is required.');
    }

    if (!req.file) {
      return res.status(400).send('Image file is required.');
    }

    const newPost = {
      id: Date.now().toString(),  // Ensure unique post id
      description,
      imageUrl: `/uploads/${req.file.filename}`,
      likes: 0,
      comments: [],
    };

    const posts = await loadPosts();
    posts.unshift(newPost); // Add to the top of the list
    await savePosts(posts);

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API to like a post
app.post('/posts/:id/likes', async (req, res) => {
  const posts = await loadPosts();
  const post = posts.find((p) => p.id === req.params.id);  // Use 'id' instead of '_id'
  if (post) {
    post.likes += 1;
    await savePosts(posts);
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

// API to add a comment to a post
app.post('/posts/:id/comments', async (req, res) => {
  const posts = await loadPosts();
  const post = posts.find((p) => p.id === req.params.id);  // Use 'id' instead of '_id'
  if (post) {
    post.comments.push({ text: req.body.comment, by: 'Anonymous' });
    await savePosts(posts);
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong! Please try again later.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
