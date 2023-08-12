const router = require('express').Router();
const { Comment, User } = require('../../models');
//  uses api/comments
router.get('/', async (req,res)=>{
    try{
            const commentData = await Comment.findAll({
            include:[{
                model: User, 
                attributes:['name']}],
            });
    res.status(200).json(commentData);
    }catch (err) {
            res.status(500).json(err)
    }
});

module.exports = router;