"use strict";

const path = require(`path`);
const express = require(`express`);
const chalk = require(`chalk`);
const articlesRoutes = require(`./routes/articles-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

const PORT = 8080;
const PUBLIC_DIR = `public`;

const app = express();
app.locals.dayjs = require(`dayjs`);

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(`/articles`, articlesRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);
app.use(`/400`, (req, res) => res.render(`errors/404`));
app.use(`/500`, (req, res) => res.render(`errors/500`));

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.listen(PORT, () => {
  console.info(chalk.green(`Frontend server starts on PORT ${PORT}`));
});
