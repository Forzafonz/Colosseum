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

INSERT INTO users (id, username, email, password, avatar)
            VALUES (1, 'alpha', 'alpha@gmail.com', '123', 'https://static.toiimg.com/thumb/resizemode-4,msid-76729750,imgsize-249247,width-720,height-540/76729750.jpg'),
            (2, 'bravo', 'beta@gmail.com', '123', 'https://www.w3schools.com/howto/img_avatar2.png'),
            (3, 'charlie', 'charlie@gmail.com', '123','https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'),
            (4, 'delta', 'delta@gmail.com', '123','https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg');

INSERT INTO playlists(id, name , rating, thumbnail, queue)
            VALUES(DEFAULT, 'PL-1', 4, 'https://assets.smoothradio.com/2017/26/ed-sheeran-1498662806-editorial-short-form-0.jpg', true),
            (DEFAULT, 'PL-2', 5,'https://media1.popsugar-assets.com/files/thumbor/wNhs3Orm_ob0T6fsFhqfRgMRCEw/1346x474:4298x3426/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/10/31/972/n/1922283/b80874af5dbb5e357a48b0.76757692_/i/Best-Young-Music-Artists-2019.jpg' , false),
            (DEFAULT, 'PL-3', 4,'https://www.grammy.com/sites/com/files/styles/news_detail_header/public/gettyimages-1014868608.jpg?itok=eLyDCDbM' , false),
            (DEFAULT, 'PL-4', 5,'https://i.insider.com/5b21452f1ae6623b008b5306?width=750&format=jpeg&auto=webp' , false),
            (DEFAULT, 'PL-5', 4,'https://www.liveabout.com/thmb/CXNryNO4dxhyT13v41hVmKXHq1Q=/3000x2000/filters:no_upscale():max_bytes(150000):strip_icc()/weeknd-56a96cf75f9b58b7d0fb536c.jpg' , false);

INSERT INTO media (link, category, thumbnail, description)
            VALUES('https://www.youtube.com/watch?v=IfFhU3edLk4', 'video', 't', 'desc1'),
            ('https://www.youtube.com/watch?v=b4eMyOzD9UI', 'video', 't', 'desc1'),
            ('https://www.youtube.com/watch?v=lPKjlbXHP3E', 'video', 't', 'desc1'),
            ('https://www.youtube.com/watch?v=iqIn9N_fJJY', 'video', 't', 'desc1'),
            ('https://www.youtube.com/watch?v=dwDns8x3Jb4', 'video', 't', 'desc1'),
            ('https://www.youtube.com/watch?v=auLBLk4ibAk', 'video', 't', 'desc1'),
            ('https://www.youtube.com/watch?v=D0W1v0kOELA', 'video', 't', 'desc1'),
            ('https://www.youtube.com/watch?v=_pFZz3OXcMs', 'video', 't', 'desc1'),
            ('https://www.youtube.com/watch?v=rIvEiTrq9kk', 'video', 't', 'desc1'),
            ('https://www.youtube.com/watch?v=h4UqMyldS7Q', 'video', 't', 'desc1');

INSERT INTO users_playlists (is_host, user_id, playlist_id)
            VALUES(true, 1 , 1),
            (false, 3 , 1),
            (false, 2 , 1),
            (false, 4 , 1),
            (false, 1 , 2),
            (true, 2 , 2),
            (false, 3 , 2),
            (false, 4 , 2),
            (false, 1 , 3),
            (false, 2 , 3);

INSERT INTO playlists_media (media_rating, play_order, played_already, played_length, media_id, playlist_id)
            VALUES (3, 1, true, 1.10, 1, 1),
            (4, 2, false, 0.00, 2, 1),
            (1, 3, false, 0.00, 3, 1),
            (6, 4, false, 0.00, 4, 1),
            (2, 1, true, 2.00, 2, 2),
            (3, 2, true, 2.00, 3, 2),
            (6, 3, false, 0.00, 5, 2),
            (4, 4, false, 0.00, 6, 2),
            (1, 1, false, 0.00, 6, 3),
            (5, 2, false, 0.00, 7, 3),
            (3, 3, false, 0.00, 8, 3),
            (3, 1, true, 1.20, 9, 4),
            (2, 2, false, 0.00, 3, 4),
            (1, 3, false, 0.00, 10, 4),
            (3, 1, false, 0.00, 4, 5);

INSERT INTO messages (id, text, date, users_playlists_id)
            VALUES(1, 'Hello There !!',1632010842289,1),
            (2, 'Hi !!',1632010842289,2),
            (3, 'Whats up..',1632010842289,1),
            (4, 'All good',1632010842289,3),
            (5, 'new or old playlist',1632010842289,4),
            (6, 'old will be good',1632010842289,2),
            (7, 'great!!',1632010842289,1);
            