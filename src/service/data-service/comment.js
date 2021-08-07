"use strict";

const { Comments } = require(`../models/index`);

class CommentService {
  async create(articleId, commentData) {
    const comment = await Comments.create({ articleId, ...commentData });
    return comment.get();
  }
}

module.exports = CommentService;
