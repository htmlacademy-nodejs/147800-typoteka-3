-- get categories list (id, label)
SELECT id, label FROM categories;

-- get categories (id, label) with more than one article
SELECT categories.id, categories.label FROM categories 
INNER JOIN article_categories ON article_categories.category_id = categories.id
GROUP BY categories.id;

-- get categories with articles count (id, label, articles count)
SELECT categories.id, categories.label, count(categories.id) as "articles count" FROM categories 
INNER JOIN article_categories ON article_categories.category_id = categories.id
GROUP BY categories.id
ORDER BY count(categories.id) DESC;

-- get articles list with categories names (id, title, announce, date, author first name, author last name, author email, comments count, categories names)
SELECT 
  articles.id, 
  articles.title, 
  articles.announce, 
  articles.created_at, 
  users.first_name as user_first_name, 
  users.last_name as user_last_name, 
  users.email as user_email,
  count(comments.id) as comments_count,
  STRING_AGG(DISTINCT categories.label, ', ') AS categories_list
  FROM articles
INNER JOIN article_categories ON article_categories.article_id = articles.id
INNER JOIN categories ON categories.id = article_categories.category_id
LEFT JOIN comments ON comments.article_id = articles.id
INNER JOIN users ON users.id = articles.user_id
GROUP BY articles.id, users.id
ORDER BY articles.created_at DESC;

-- get info for selected article (id, title, announce, date, author first name, author last name, author email, comments count, categories names)
SELECT 
  articles.id, 
  articles.title, 
  articles.announce, 
  articles.created_at, 
  users.first_name as user_first_name, 
  users.last_name as user_last_name, 
  users.email as user_email,
  count(comments.id) as comments_count,
  STRING_AGG(DISTINCT categories.label, ', ') AS categories_list
  FROM articles
INNER JOIN article_categories ON article_categories.article_id = articles.id
INNER JOIN categories ON categories.id = article_categories.category_id
LEFT JOIN comments ON comments.article_id = articles.id
INNER JOIN users ON users.id = articles.user_id
WHERE articles.id = 1
GROUP BY articles.id, users.id;

-- get 5 newest comments (id, article id, user first name, user last name, text)
SELECT 
  comments.id,
  comments.article_id,
  users.first_name as user_first_name,
  users.last_name as user_last_name,
  comments.text
FROM comments
INNER JOIN users ON comments.user_id = users.id
ORDER BY comments.created_at DESC
LIMIT 5;

-- get comments for selected article (id, article id, user first name, user last name, text)
SELECT 
  comments.id,
  comments.article_id,
  users.first_name as user_first_name,
  users.last_name as user_last_name,
  comments.text
FROM comments
INNER JOIN users ON comments.user_id = users.id
GROUP BY comments.id, users.id
HAVING comments.article_id = 1
ORDER BY comments.created_at DESC;

-- update title for selected article
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 1;