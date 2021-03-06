-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS messages CASCADE;
-- CREATE TABLE users(
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE messages(

--   id SERIAL PRIMARY KEY NOT NULL,
--   text VARCHAR(1000) NOT NULL,
--   date VARCHAR(1000) NOT NULL,
--   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
-- );

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS playlists CASCADE;
DROP TABLE IF EXISTS users_playlists CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS playlists_media CASCADE;
DROP TABLE IF EXISTS messages CASCADE;


CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) NOT NULL
);

CREATE TABLE playlists(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  rating INT,
  thumbnail VARCHAR(255),
  queue BOOLEAN,
  url VARCHAR(255) NOT NULL 
);
-- Added active column to indicate which user joined which playlist
CREATE TABLE users_playlists(
  id SERIAL PRIMARY KEY NOT NULL,
  active BOOLEAN DEFAULT FALSE,
  is_host BOOLEAN,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  playlist_id INTEGER REFERENCES playlists(id) ON DELETE CASCADE
);

CREATE TABLE media(
  id SERIAL PRIMARY KEY NOT NULL,
  link VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  thumbnail VARCHAR(255),
  description TEXT
);

CREATE TABLE playlists_media(
  id SERIAL PRIMARY KEY NOT NULL,
  media_rating INTEGER DEFAULT 0,
  play_order Integer,
  played_already BOOLEAN DEFAULT FALSE,
  played_length FLOAT,
  media_id INTEGER REFERENCES media(id) ON DELETE CASCADE,
  playlist_id INTEGER REFERENCES playlists(id) ON DELETE CASCADE
);

CREATE TABLE messages(
  id SERIAL PRIMARY KEY NOT NULL,
  text VARCHAR(255),
  date VARCHAR(255),
  users_playlists_id INTEGER REFERENCES users_playlists(id) ON DELETE CASCADE
);

