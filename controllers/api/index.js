const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const commentRoutes = require('./commentRoutes.js');
const postRoutes = require('./postRoutes.js');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);


module.exports = router;
