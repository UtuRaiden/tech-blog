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
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      
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