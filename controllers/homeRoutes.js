const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
        include:[
    {
        model:User,
        attributes:['username'],
    }]})

    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the dashboard
  if (req.session.loggedIn) {
     res.redirect('/dashboard');
    console.log('test homeRoutes.js');
    return;
  }

   res.render('login');
});

module.exports = router;
