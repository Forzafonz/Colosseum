SELECT * 
FROM users_playlists 
JOIN playlists ON playlist_id = playlists.id
WHERE user_id = 1; 
-- replace hard-coded user_id with logged in user id