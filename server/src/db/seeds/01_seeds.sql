-- INSERT INTO users (name)
--   VALUES
--   ('Irene'),
--   ('Georgie'),
--   ('Betty'),
--   ('Mayme');
  
-- INSERT INTO messages(text, date, user_id)
--   VALUES
--   ('Hello from Irene!',   1632010842289, 1),
--   ('Hello from Georgie',  1632010841481, 2),
--   ('Hello from Betty',    1632010842289, 3),
--   ('Hello from Mayme',    1632010843017, 4);

INSERT INTO users (username, email, password, avatar)
            VALUES ('alpha', 'alpha@gmail.com', '123', 'https://static.toiimg.com/thumb/resizemode-4,msid-76729750,imgsize-249247,width-720,height-540/76729750.jpg'),
            ('bravo', 'beta@gmail.com', '123', 'https://www.w3schools.com/howto/img_avatar2.png'),
            ('charlie', 'charlie@gmail.com', '123','https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'),
            ('delta', 'delta@gmail.com', '123','https://thumbs.dreamstime.com/z/pet-cat-wearing-protective-surgical-face-mask-cute-domestic-shorthair-looking-forward-camera-isolated-white-background-179348996.jpg');

INSERT INTO playlists( name , rating, thumbnail, queue, url)
            VALUES('Hip hop', 4, 'https://i.ytimg.com/vi/BJzmJxLncO4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSEfyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB_9bTjd9C2wNdAlr4nl-tybotwQg', true, 'tzb8KttazzZ7PZb'),
            ('House music', 5,'https://i.ytimg.com/vi/sS5ifIkEUYg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSEfyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhkrW7AoXDjv8B9rDAI_PidBxJQw' , false,'wZz8ZAu2Zwa1txa'),
            ('Rock music', 4,'https://i.ytimg.com/vi/xgEpkO-MWC0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSEfyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA6MFd6vGSJ4BEFu27LuONWQ2s_ZQ' , false,'a7ZPtt7n1e8KZxn'),
            ('All music', 5,'https://media.istockphoto.com/vectors/music-notes-icons-set-vector-vector-id1089469824?k=20&m=1089469824&s=612x612&w=0&h=V6w8aSh6fTXUpEKV3KzZ6aECHmYnCQyWxUTMbU8Ahgo=' , false,'pAZ9el1ZF3GG37P');

INSERT INTO media (link, category, thumbnail, description)
            VALUES('https://www.youtube.com/watch?v=IfFhU3edLk4', 'video', 'https://i.ytimg.com/vi/IfFhU3edLk4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSEfyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBHpPJUKCOKM9RJ9jeH_oL-JMCqZQ', 'Situation (Original Mix)'),
            ('https://www.youtube.com/watch?v=dwDns8x3Jb4', 'video', 'https://i.ytimg.com/vi/dwDns8x3Jb4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSEfyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCDo50aPODc6guQJetwuVHFGUplJA', 'Daft Punk - Around the world (Official Audio)'),
            ('https://www.youtube.com/watch?v=b4eMyOzD9UI', 'video', 'https://i.ytimg.com/vi/b4eMyOzD9UI/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSEfyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAjC1uVfJ2RzLPTLPJRJID2Y92adg', 'Daniel Bedingfield- Gotta Get Thru This (uk version)'),
            ('https://www.youtube.com/watch?v=lPKjlbXHP3E', 'video', 'https://i.ytimg.com/vi/lPKjlbXHP3E/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCfuzIMq0Ot8SHCpv93wR-bJ0as5Q', 'Together - So Much Love To Give'),
            ('https://www.youtube.com/watch?v=iqIn9N_fJJY', 'video', 'https://i.ytimg.com/vi/iqIn9N_fJJY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSEfyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBp59P_lOch-W67cGrrlZqYzlnrVQ', 'Stephen Marley - The Traffic Jam ft. Damian Marley'),
            ('https://www.youtube.com/watch?v=auLBLk4ibAk', 'video', 'https://i.ytimg.com/vi/auLBLk4ibAk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSEfyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC_GHiFeAn6UCl8rWKeLW_tkhwLDA', 'Rush - Tom Sawyer (Official Music Video)'),
            ('https://www.youtube.com/watch?v=D0W1v0kOELA', 'video', 'https://i.ytimg.com/vi/D0W1v0kOELA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSEfyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAVJJqu1Sufdz81xcrCVRmoK0RG9g', 'Lynyrd Skynyrd - Free Bird'),
            ('https://www.youtube.com/watch?v=_pFZz3OXcMs', 'video', 'https://i.ytimg.com/vi/_pFZz3OXcMs/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSEfyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDaSBKBmVKUDqdDGv2qundqvR33_A', 'Dyer Maker- Led Zeppelin'),
            ('https://www.youtube.com/watch?v=rIvEiTrq9kk', 'video', 'https://i.ytimg.com/vi/rIvEiTrq9kk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSEfyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBzLjB03FAhUfQ4Nd1JueOPI7kxzg', 'Mase - Feel So Good (Official Music Video)'),
            ('https://www.youtube.com/watch?v=h4UqMyldS7Q', 'video', 'https://i.ytimg.com/vi/h4UqMyldS7Q/hq720.jpg?sqp=-oaymwEcCNAFEJQDSEfyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDkb_vUfa_BwbJWkJAQdXrWOSvKZQ', 'Ice Cube - It Was A Good Day (Official Video)');

INSERT INTO users_playlists (is_host, user_id, playlist_id, active)
            VALUES(true, 1 , 4, false),
            (false, 2 , 4, false),
            (false, 3 , 4, false),
            (true, 1 , 1, false),
            (true, 2 , 2, false),
            (true, 3 , 3, false),
            (false, 4 , 1, false),
            (false, 4 , 2, false),
            (false, 4 , 3, false),
            (false, 4 , 4, false);
     

INSERT INTO playlists_media (media_rating, play_order, played_already, played_length, media_id, playlist_id)
            VALUES 
            (0, 2, false, 1.10, 9, 1),
            (0, 1, false, 1.10, 5, 1),
            (0, 3, false, 1.10, 10, 1),
            (0, 1, false, 1.10, 1, 2),
            (0, 2, false, 1.10, 2, 2),
            (0, 3, false, 1.10, 3, 2),
            (0, 4, false, 1.10, 4, 2),
            (0, 1, false, 1.10, 6, 3),
            (0, 2, false, 1.10, 7, 3),
            (0, 3, false, 1.10, 8, 3),
            (0, 1, false, 1.10, 5, 4),
            (0, 2, false, 1.10, 9, 4),
            (0, 3, false, 1.10, 10, 4),
            (0, 4, false, 1.10, 1, 4),
            (0, 5, false, 1.10, 2, 4),
            (0, 6, false, 1.10, 3, 4),
            (0, 7, false, 1.10, 4, 4),
            (0, 8, false, 1.10, 6, 4),
            (0, 9, false, 1.10, 7, 4),
            (0, 10, false, 1.10, 8, 4);

INSERT INTO messages (text, date, users_playlists_id)
            VALUES('Hello There !!',1632010842289,1),
            ('Hi !!',1632010842290,2),
            ('Whats up..',1632010842291,1),
            ('All good',1632010842292,3),
            ('new or old playlist',1632010842293,4),
            ('old will be good',1632010842294,2),
            ('great!!',1632010842295,1),
            ('Another text',1632010842296,5);
            