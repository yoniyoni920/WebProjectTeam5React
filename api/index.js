const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const contactRoute = require('./routes/contact');
const deleteScoreRoute = require('./routes/delete-scores');
const getScoreRoute = require('./routes/get-scores');
const saveScoreRoute = require('./routes/save-score');
const loggedInUsersRoute = require('./routes/loggedinusers');
const registerRoute = require('./routes/register');
const updateRoute = require('./routes/update');
const app = express();
const router = express.Router();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://client-smart-tutor.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

// Routes mounted under /api
router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
router.use('/contact', contactRoute);
router.use('/delete-scores', deleteScoreRoute);
router.use('/get-scores', getScoreRoute);
router.use('/save-score', saveScoreRoute);
router.use('/loggedinusers', loggedInUsersRoute);
router.use('/register', registerRoute);
router.use('/update', updateRoute);
// Base route
router.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api', router);

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);

// Optional: For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Local Express server running at http://localhost:${PORT}/api`);
  });
}
