"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const dayjs = require(`dayjs`);
const duration = require(`dayjs/plugin/duration`);
const { maxPublicationsNumber, ExitCode } = require(`../../constants`);
const { getRandomInt, shuffle } = require(`../../utils`);

dayjs.extend(duration);

const dateDiffInMilliseconds = dayjs.duration({ months: 3 }).asMilliseconds();

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const getCreatedDate = () => {
  const currentDateInMilliseconds = dayjs().valueOf();
  return dayjs(
    getRandomInt(
      currentDateInMilliseconds - dateDiffInMilliseconds,
      currentDateInMilliseconds
    )
  ).format(`YYYY-MM-DD hh:mm:ss`);
};

const generateOffers = (count, titles, categories, sentences) =>
  Array(count)
    .fill({})
    .map(() => ({
      title: titles[getRandomInt(0, titles.length - 1)],
      cratedDate: getCreatedDate(),
      announce: shuffle(sentences)
        .slice(1, 5)
        .join(` `),
      fullText: shuffle(sentences).join(` `),
      category: [categories[getRandomInt(0, categories.length - 1)]]
    }));

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const run = async (args) => {
  const sentences = await readContent(FILE_SENTENCES_PATH);
  const titles = await readContent(FILE_TITLES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);

  const [count] = args;
  const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

  if (countOffer > maxPublicationsNumber) {
    console.error(chalk.red(`Не больше ${maxPublicationsNumber} публикаций`));
    process.exit(ExitCode.error);
  }

  const content = JSON.stringify(
    generateOffers(countOffer, titles, categories, sentences)
  );

  try {
    await fs.writeFile(FILE_NAME, content);
    console.info(chalk.green(`Operation success. File created.`));
  } catch (error) {
    console.error(chalk.red(`Can't write data to file...`));
  }
};

module.exports = {
  name: `--generate`,
  run
};
