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
            ('delta', 'delta@gmail.com', '123','https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg');

INSERT INTO playlists( name , rating, thumbnail, queue, url)
            VALUES('Party time', 4, 'https://assets.smoothradio.com/2017/26/ed-sheeran-1498662806-editorial-short-form-0.jpg', true, 'tzb8KttazzZ7PZb'),
            ('Spooky movies', 5,'https://media1.popsugar-assets.com/files/thumbor/wNhs3Orm_ob0T6fsFhqfRgMRCEw/1346x474:4298x3426/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/10/31/972/n/1922283/b80874af5dbb5e357a48b0.76757692_/i/Best-Young-Music-Artists-2019.jpg' , false,'wZz8ZAu2Zwa1txa'),
            ('Summer music', 4,'https://www.grammy.com/sites/com/files/styles/news_detail_header/public/gettyimages-1014868608.jpg?itok=eLyDCDbM' , false,'a7ZPtt7n1e8KZxn'),
            ('LHL Lectures', 5,'https://i.insider.com/5b21452f1ae6623b008b5306?width=750&format=jpeg&auto=webp' , false,'pAZ9el1ZF3GG37P'),
            ('Study music', 4,'https://www.liveabout.com/thmb/CXNryNO4dxhyT13v41hVmKXHq1Q=/3000x2000/filters:no_upscale():max_bytes(150000):strip_icc()/weeknd-56a96cf75f9b58b7d0fb536c.jpg' , false, '7tFP23ptPPA3eau'),
            ('Test for newForm', 4,'https://www.liveabout.com/thmb/CXNryNO4dxhyT13v41hVmKXHq1Q=/3000x2000/filters:no_upscale():max_bytes(150000):strip_icc()/weeknd-56a96cf75f9b58b7d0fb536c.jpg' , false, '7tFP23ptPPA3eau');
INSERT INTO media (link, category, thumbnail, description)
            VALUES('https://www.youtube.com/watch?v=IfFhU3edLk4', 'video', 'https://images-prod.healthline.com/hlcmsresource/images/Dog-Breeds-Health-Problems/3180-Pug_green_grass-1284x400-BANNER10.jpg', 'Media 1'),
            ('https://www.youtube.com/watch?v=dwDns8x3Jb4', 'video', 'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80', 'Media 2'),
            ('https://www.youtube.com/watch?v=b4eMyOzD9UI', 'video', 'https://thumbs.dreamstime.com/b/dog-golden-retriever-jumping-autumn-leaves-autumnal-sunlight-77861618.jpg', 'Media 3'),
            ('https://www.youtube.com/watch?v=lPKjlbXHP3E', 'video', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80', 'Media 4'),
            ('https://www.youtube.com/watch?v=iqIn9N_fJJY', 'video', 't', 'Media 5'),
            ('https://www.youtube.com/watch?v=auLBLk4ibAk', 'video', 't', 'Media 6'),
            ('https://www.youtube.com/watch?v=D0W1v0kOELA', 'video', 't', 'Media 7'),
            ('https://www.youtube.com/watch?v=_pFZz3OXcMs', 'video', 't', 'Media 8'),
            ('https://www.youtube.com/watch?v=rIvEiTrq9kk', 'video', 't', 'Media 9'),
            ( 'https://www.youtube.com/watch?v=h4UqMyldS7Q', 'video', 't', 'Media 10');

INSERT INTO users_playlists (is_host, user_id, playlist_id, active)
            VALUES(true, 1 , 1, false),
            (false, 2 , 1, true),
            (false, 3 , 1, true),
            (false, 4 , 1, true),
            (false, 1 , 2, false),
            (true, 2 , 2, false),
            (false, 3 , 2, false),
            (false, 4 , 2, false),
            (false, 1 , 3, false),
            (true, 1 , 6, true),
            (false, 2 , 3, false);

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

INSERT INTO messages (text, date, users_playlists_id)
            VALUES('Hello There !!',1632010842289,1),
            ('Hi !!',1632010842290,2),
            ('Whats up..',1632010842291,1),
            ('All good',1632010842292,3),
            ('new or old playlist',1632010842293,4),
            ('old will be good',1632010842294,2),
            ('great!!',1632010842295,1),
            ('Another text',1632010842296,5);
            