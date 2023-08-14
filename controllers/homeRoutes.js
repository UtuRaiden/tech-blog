const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Allows non-logged in users to view the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
        include:[
    {
        model:User,
        attributes:['username'],
    }]})
    //orders the data so it can be readable by the .render
    const posts = postData.map((post) => post.get({ plain: true }));

    // gives ordered data to display the homepage
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
    return;
  }
   res.render('login');
});



//gets a single post after clicking on it and renders that post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
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

    const post = postData.get({ plain: true });
    
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// gets a single post that can be edited and renders it
router.get('/post/:id/edit', withAuth, async (req, res) => {
  try {
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

    const post = postData.get({ plain: true });

    res.render('post-edit', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
