-- Add articles categories
INSERT INTO categories (label) VALUES
('Жизнь и путешествия'),
('Путешествия'),
('Дизайн и программирование'),
('Другое'),
('Личное'),
('Дизайн'),
('Дизайн и обустройство'),
('Удаленная работа'),
('Фриланс'),
('Автомобили'),
('Бизнес'),
('Производство игрушек'),
('UX & UI');

-- Add app users
INSERT INTO users (first_name, last_name, email, picture, small_picture) VALUES
('Иван','Иванов', 'ivanov@ya.ru','avatar-1.png',''),
('Алёна','Фролова', 'frolova@ya.ru','avatar-2.png',''),
('Дина','Петрова', 'petrova@ya.ru','avatar-3.png',''),
('Карина','Валиева', 'valieva@ya.ru','avatar-4.png',''),
('Пётр','Сидоров', 'sidorov@ya.ru','avatar-5.png',''),
('Алёна','Павлова', 'pavlova@ya.ru','','avatar-small-1.png'),
('Елена','Егорова', 'egorova@ya.ru','','avatar-small-2.png'),
('Иван','Голунов', 'golunov@ya.ru','','avatar-small-3.png');

-- Add articles
INSERT INTO articles (title, picture, retina_picture, announce, full_text, user_id, created_at) VALUES
('Рок — это протест','forest@1x.jpg', 'forest@2x.jpg','Рок-музыка всегда ассоциировалась с протестами.','Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?',1,'2020-01-23'),
('Как перестать беспокоиться и начать жить','sea-fullsize@1x.jpg','sea-fullsize@2x.jpg','Бороться с прокрастинацией несложно.','Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.',2,'2020-04-01'),
('Обзор новейшего смартфона','sea@1x.jpg','sea@2x.jpg','Этот смартфон — настоящая находка.','Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.',3,'2020-10-10'),
('Самый лучший музыкальный альбом этого года','skyscraper@1x.jpg','skyscraper@2x.jpg','Альбом стал настоящим открытием года.','Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.',1,'2020-12-01');

-- Add relations between articles and categories
INSERT INTO article_categories (article_id, category_id) VALUES
(1, 4),
(2, 1),
(3, 3),
(4, 4);

-- Add comments for articles
INSERT INTO comments (article_id, user_id, text, created_at) VALUES
(1, 1, 'Согласен с автором!', '2020-01-23'),
(1, 2, 'Плюсую, но слишком много буквы!', '2020-01-24'),
(2, 3, 'Мне кажется или я уже читал это где-то?', '2020-04-01'),
(2, 4, 'Планируете записать видосик на эту тему?', '2020-04-03'),
(3, 5, 'Совсем немного...', '2020-10-10'),
(3, 6, 'Согласен с автором!', '2020-10-19'),
(4, 7, 'Плюсую, но слишком много буквы!', '2020-12-01'),
(4, 8, 'Хочу такую же футболку :-)', '2020-12-12');
