"use strict";

const request = require(`supertest`);
const { app: server } = require(`../server`);

describe(`server test`, () => {
  describe(`articles API`, () => {
    test(`GET articles successfully`, async () => {
      const res = await request(server).get(`/api/articles`);

      expect(res.statusCode).toBe(200);
    });

    test(`POST article successfully`, async () => {
      const res = await request(server).post(`/api/articles`);

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(`Add new article`);
    });

    test(`GET article successfully`, async () => {
      const articles = await request(server).get(`/api/articles`);
      const res = await request(server).get(
        `/api/articles/${articles.body[0].id}`
      );

      expect(res.statusCode).toBe(200);
    });

    test(`GET article with error`, async () => {
      const res = await request(server).get(`/api/articles/-1`);

      expect(res.statusCode).toBe(404);
      expect(res.text).toEqual(`Article not found`);
    });

    test(`PUT article successfully`, async () => {
      const res = await request(server).put(`/api/articles/1`);

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(`Update article with articleId="1"`);
    });

    test(`DELETE article successfully`, async () => {
      const res = await request(server).delete(`/api/articles/1`);

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(`Delete article with articleId="1"`);
    });

    test(`GET comments successfully`, async () => {
      const articles = await request(server).get(`/api/articles`);
      const res = await request(server).get(
        `/api/articles/${articles.body[0].id}/comments`
      );

      expect(res.statusCode).toBe(200);
    });

    test(`GET comments with error`, async () => {
      const res = await request(server).get(`/api/articles/0/comments`);

      expect(res.statusCode).toBe(404);
      expect(res.text).toBe(`Comments not found`);
    });

    test(`POST comment successfully`, async () => {
      const res = await request(server).post(`/api/articles/1/comments`);

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(`Add new comment to article with articleId="1"`);
    });

    test(`DELETE comment successfully`, async () => {
      const res = await request(server).delete(`/api/articles/1/comments/1`);

      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual(
        `Delete comment with commentId="1" of article with articleId="1"`
      );
    });
  });

  test(`GET categories successfully`, async () => {
    const res = await request(server).get(`/api/categories`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      { id: 1, label: `Жизнь и путешествия`, count: `1` },
      { id: 2, label: `Путешествия`, count: `0` },
      { id: 3, label: `Дизайн и программирование`, count: `1` },
      { id: 4, label: `Другое`, count: `2` },
      { id: 5, label: `Личное`, count: `0` },
      { id: 6, label: `Дизайн`, count: `0` },
      { id: 7, label: `Дизайн и обустройство`, count: `0` },
      { id: 8, label: `Удаленная работа`, count: `0` },
      { id: 9, label: `Фриланс`, count: `0` },
      { id: 10, label: `Автомобили`, count: `0` },
      { id: 11, label: `Бизнес`, count: `0` },
      { id: 12, label: `Производство игрушек`, count: `0` },
      { id: 13, label: `UX & UI`, count: `0` }
    ]);
  });

  test(`GET search successfully`, async () => {
    const res = await request(server).get(`/api/search?query=`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).not.toEqual(0);
  });
});
