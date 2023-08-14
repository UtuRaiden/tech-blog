const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

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
    const post = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(post);
    console.log('New post created!');
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req,res)=>{
  try{
    const postDelete = await Post.destroy({
      where:{
        id:req.params.id,
      }
    })
    if (!postDelete){
      res.status(404).json({ message: 'No post with that Id!'})
      return;
    }
  }catch (err){
    console.error(err)
    res.status(500).json(err);
  }
})
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No posts found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;