const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/', async (req,res)=>{
    try{
            const postData = await Post.findAll({
              include:[
                {
                    model: User,
                    attributes:['username'],
                }],
            });
    res.status(200).json(postData);
    }catch (err) {
            res.status(500).json(err)
    }
});

router.get('/:id', async (req,res)=>{

  try{
  if (!postData){
    res.status(404).json({message: "No post with that ID!"})
    return;
  }
  res.status(200).json(postData);
  }catch (err){res.status(500).json(err)}
});

router.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
    console.log('New post created!');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;