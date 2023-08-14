const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts to show on Dashboard
router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
         where: {
            user_id: req.session.user_id
        },
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'date_created', 'user_id', 'post_id'],
            include: {
              model: User,
              attributes: ['username']
            }
          }
        ],
        logging: console.log
      });
  
      // Puts the data in order so the .render can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      //gives the data to the .render so that it can be displayed
      
      res.render('dashboard', { 
        posts, 
        loggedIn: req.session.loggedIn 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;