"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const multer = require(`multer`);
const { nanoid } = require(`nanoid`);
const articlesRouter = new Router();

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

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

articlesRouter.get(`/add`, async (req, res) => {
  const { data: categories } = await axios.get(`${URL}/api/categories`);
  res.render(`articles/new-post`, { data: {}, categories });
});
articlesRouter.post(`/add`, upload.single(`picture`), async (req, res) => {
  const { file } = req;

  try {
    await axios.post(`${URL}/api/articles`, req.body);
    res.redirect(`/my`);
  } catch (error) {
    const { data: categories } = await axios.get(`${URL}/api/categories`);
    res.render(`articles/new-post`, { data: req.body, categories });
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
