const router = require('express').Router();
const { default: AsyncQueue } = require('sequelize/types/dialects/mssql/async-queue');
const { Post, Users, Comment } = require('../../models');
const withAuth = require('../../utilis/auth');


//Get all user ===
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'created_at', 'post_body', 'updated_at',],
        include: [
            // include the Comment model here:
            {
                model: Users,
                attributes: ['username', 'github'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'post_body', 'updated_at',],
                include: {
                    model: Users,
                    attributes: ['username', 'github'],
                },
            },
        ],
    })
        .then((postData) => {
            if (!postData) {
                res.status(404).json({ message: 'No post founf with this id' });
                return;
            }
            res.json(postData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get post by id
router.get('/:id', withAuth, async (req, res) => {
    console.log('made it to get post by id');
    try {
        const idPost = await Post.findByPk({
            attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                //attached username
                {
                    model: Comment,
                    attributes: ['id', 'comment_body', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username', 'github'],
                    },
                },
                {
                    model: User,
                    attributes: ['username', 'github'],
                },
            ],
        })
        const post = idPost.map((post) => post.get({ plain: true}));
        const comment = idPost.comments.map((test) => test.get({ plain: true}))
        res.render('single-post', {
            posts,
            comment,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create post ===
router.post('/', withAuth, async (req, res) => {
    console.log("made it to create post route");
    try {
       const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
       });

       res.status(200)
    } catch (error) {
        res.status(400).json(err);
    }
});

//delete post
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Update Post
  router.put('/:id', withAuth, async (req, res) => {
    try {
      console.log(req.body.post_id);
      const updatePost = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json(updatePost);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });
  
  module.exports = router;