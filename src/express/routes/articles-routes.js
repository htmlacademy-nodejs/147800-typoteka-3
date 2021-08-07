"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const multer = require(`multer`);
const { nanoid } = require(`nanoid`);
const articlesRouter = new Router();
const { ensureArray } = require(`../../utils`);
const upload = require(`../middlewares/upload`);

const URL = `http://localhost:3000`;
const UPLOAD_DIR = `public/img`;

const MimeTypeExtension = {
  "image/png": `png`,
  "image/jpeg": `jpg`,
  "image/jpg": `jpg`
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const fileExtention = MimeTypeExtension[file.mimetype];
    cb(null, `${nanoid()}.${fileExtention}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowTypes = Object.keys(MimeTypeExtension);
  const isValid = allowTypes.includes(file.mimetype);
  cb(null, isValid);
};

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024
//   }
// });

articlesRouter.get(`/add`, async (req, res) => {
  const { data: categories } = await axios.get(`${URL}/api/categories`);
  res.render(`articles/new-post`, { data: {}, categories });
});
articlesRouter.post(`/add`, upload.single(`picture`), async (req, res) => {
  const { user } = req.session;
  const { body, file } = req;

  const articleData = {
    title: body.title,
    announce: body.announce,
    fullText: body.fullText,
    picture: file.filename,
    categories: ensureArray(body.category),
    userId: user.id
  };

  try {
    await axios.post(`${URL}/api/articles`, articleData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(
      `/articles/add?error=${encodeURIComponent(error.response.data)}`
    );
  }
});
articlesRouter.get(`/category/:id`, async (req, res) => {
  const { id } = req.params;
  const { data: categories } = await axios.get(`${URL}/api/categories`);
  const { data: selectedCategory } = await axios.get(
    `${URL}/api/categories/${id}`
  );
  const { data: articles } = await axios.get(`${URL}/api/articles`, {
    params: {
      categoryId: id
    }
  });
  res.render(`articles/articles-by-category`, {
    selectedCategory,
    articles,
    categories
  });
});
articlesRouter.get(`/edit/:id`, async (req, res) => {
  const { data: article } = await axios.get(
    `${URL}/api/articles/${req.params.id}`
  );
  res.render(`articles/post`, { article });
});
articlesRouter.get(`/:id`, async (req, res) => {
  const { data: article } = await axios.get(
    `${URL}/api/articles/${req.params.id}`
  );
  res.render(`articles/post`, { article });
});

module.exports = articlesRouter;
