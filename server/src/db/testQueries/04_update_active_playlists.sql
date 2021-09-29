UPDATE users_playlists
SET active='false';

UPDATE users_playlists
SET active='true'
WHERE playlist_id = 3;