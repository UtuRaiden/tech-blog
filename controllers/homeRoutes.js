const router = require('express').Router();
const { User, Post, Comment } = require('../models');
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

router.get('/post/:id', async (req, res) => {
  try {
    console.log('req params id:',req.params.id)

    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['user_id','post_id','comment_text','date_created'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ],
    });
    console.log(postData)

    const post = postData.get({ plain: true });
    
    console.log(post)
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
