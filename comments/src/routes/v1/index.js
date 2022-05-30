const { Router } = require('express');
const {
  catchErrors,
  methodNotAllowedHandler,
  verifyUserToken
} = require('../../middleware');

// inject all dependencies
const CommentModel = require('../../models');
const CommentRepository = require('../../repository/CommentRepository');
const CommentController = require('../../controllers/CommentController');

const commentRepository = new CommentRepository(CommentModel);
const commentController = new CommentController(commentRepository);

const router = Router();

router.get('/', (req, res) => {
  const message = 'comment service is up and running';
  return res.status(200).json({
    message,
  });
});

router.post('/comment', verifyUserToken, catchErrors(commentController.addComment)).all(methodNotAllowedHandler);
router.get('/comment/:id', catchErrors(commentController.getComment)).all(methodNotAllowedHandler);
router.get('/comments', catchErrors(commentController.getCommentsData)).all(methodNotAllowedHandler);
router.patch('/comment/:id', catchErrors(commentController.updateCommentData)).all(methodNotAllowedHandler);
router.get('/user/:id/comments', catchErrors(commentController.getUserComments)).all(methodNotAllowedHandler);
router.delete('/comment/:id', catchErrors(commentController.removeComment)).all(methodNotAllowedHandler);
router.get('/aggregate/comments', catchErrors(commentController.aggregate)).all(methodNotAllowedHandler);

module.exports = router;
