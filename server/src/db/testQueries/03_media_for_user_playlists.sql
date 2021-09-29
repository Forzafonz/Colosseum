SELECT *
FROM playlists_media 
JOIN media ON media_id = media.id
JOIN users_playlists ON users_playlists.playlist_id = playlists_media.playlist_id
WHERE user_id = 4;
-- replace hard coded user_id with selected user_id