const BaseController = require('./BaseController');

class CommentController extends BaseController {
  constructor(commentRepository) {
    super();
    this.commentRepository = commentRepository;
  }

  async addComment(req, res) {
    const data = await this.commentRepository.addComment(req.body);

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Successfully added a comment', this.responseManager.HTTP_STATUS.CREATED, data);
  }

  async getComment(req, res) {
    const id = req.params.id;
    const data = await this.commentRepository.getComment(id);

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Successfully retried comment data', this.responseManager.HTTP_STATUS.OK, data);
  }

  async getCommentsData(req, res) {
    const data = await this.commentRepository.getCommentsData();

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Successfully retried all comment data', this.responseManager.HTTP_STATUS.OK, data);
  }

  async updateCommentData(req, res) {
    const id = req.params.id;
    const commentData = req.body;
    const data = await this.commentRepository.updateCommentData({ id, commentData });

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Successfully updated the user data', this.responseManager.HTTP_STATUS.OK, data);
  }

  async getUserComments(req, res) {
    const userId = req.params.id;
    const data = await this.commentRepository.getUserComments(userId);

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Successfully retrieved user comment data', this.responseManager.HTTP_STATUS.OK, data);
  }

  async removeComment(req, res) {
    const id = req.params.id;
    const data = await this.commentRepository.removeComment(id);

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Successfully removed the user data', this.responseManager.HTTP_STATUS.NO_CONTENT, data);
  }

  async aggregate(req, res) {
    const data = await this.commentRepository.aggregate(req.body);

    return this.responseManager
      .getResponseHandler(res)
      .onSuccess('Aggregation complete', this.responseManager.HTTP_STATUS.OK, data);
  }
}

module.exports = CommentController;
