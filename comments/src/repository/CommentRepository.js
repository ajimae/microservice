const { formatData } = require('../utils');

class CommentRepository {
  constructor(Comment) {
    this.Comment = Comment;
  }

  /**
   * @description create a new comment
   * @param {*} commentData 
   * @returns 
   */
  async addComment(commentData) {
    return this.Comment({ ...commentData }).save();
  }

  /**
   * @description get comment data
   * 
   * @param {*} id
   * @returns comment document
   */
  async getComment(id) {
    return this.Comment.findOne({ _id: id });
  }

  /**
   * @description get all comments
   * @returns comment documents
   */
  async getCommentsData() {
    return this.Comment.find();
  }

  /**
   * @example
   * 
   * @description comment details update function 
   * 
   * @param {*} id 
   * @param {*} commentData
   * 
   * @returns updated comment document
   */
  async updateCommentData({ id, commentData }) {
    const { hashTags, mentions, ...rest } = commentData;
    return this.Comment
      .findOneAndUpdate(
        { _id: id }, { $set: { ...rest }, $addToSet: { hashTags, mentions } }, { new: true }
      );
  }

  /**
   * @description get all the comments that belongs to a specific user
   * 
   * @param {*} userId 
   * @returns Array<Comments>
   */
  async getUserComments(userId) {
    const query = { userId }; // check how to do this
    return this.Comment.find({ query });
  }

  /**
   * @description remove a comment
   * 
   * @param {*} id 
   * @returns 
   */
  async removeComment(id) {
    const query = { _id: id };
    return this.Comment.findOneAndDelete(query, { new: true });
  }

  /**
   * @description aggregate hashTags or mentions
   * 
   * @param {*} entity
   * @returns aggregated results
   */
  async aggregate({ entity, rank = null, combine = false }) {
    // aggregate data and rank them into top 10 [only for hashTags and mentions]
    if (!entity) entity = combine = true
    if (combine) {
      const hashTags = await this.process('hashTags', rank);
      const mentions = await this.process('mentions', rank);

      return [...hashTags, ...mentions];
    }
    return this.process(entity, rank, combine);
  }

  async process(entity, rank) {
    return this.Comment.aggregate([
      {
        $unwind: `$${entity}`
      },
      {
        $group: {
          "_id": `$${entity}`,
          "count": {
            $sum: 1
          }
        }
      },
      {
        "$sort": {
          count: -1
        }
      },
      {
        $limit: rank ? rank : 10
      },
      {
        $group: {
          "_id": null,
          [`${entity}_details`]: {
            $push: {
              "hashTags": "$_id",
              "occurrence": "$count"
            }
          }
        }
      },
      {
        $project: {
          "_id": 0,
          [`${entity}_details`]: 1
        }
      }
    ]);
  }
}

module.exports = CommentRepository
