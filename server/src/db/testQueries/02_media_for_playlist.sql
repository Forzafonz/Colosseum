SELECT *
FROM playlists_media 
JOIN media ON media_id = media.id
WHERE playlist_id = 5;
-- replace hard coded playlist_id with selected playlist id