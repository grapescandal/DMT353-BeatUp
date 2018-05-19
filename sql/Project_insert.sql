use beat_up;
insert into user 
(user_name,user_lastname,user_email,password,date_of_birth) values
('taew','leader','leader@email.com','123456789','1997-01-02'),
('ton','lnwza','ton@email.com','987654321','1996-03-04'),
('oat','rawat','rawat@email.com','zxc123','1995-05-06'),
('pei','hello','hello@email.com','123asd','1994-07-08'),
('binarynman','helloworld','binarynman@email.com','789qwe','1993-09-10');
insert into music 
(music_name,music_artist,music_moods,music_genres,user_id) values
('Count on me','Bruno Mars',2,1,2),
('Shape of you','Ed Sheeran',4,1,3),
('Sugar','Maroon5',3,1,0),
('Nightmare','Avenged Sevenfold',4,2,1),
('Lay me down','Sam Smith',1,3,4);
insert into genres
(genres_name) values
('Pop'),
('Rock'),
('R&B'),
('Jass');
insert into moods
(moods_name) values
('Sad'),
('Love'),
('Happy'),
('Relax');
insert into albums
(albums_name,user_id) values
('Top 50 Thailand',1),
('Top 50 Global',2);
insert into albums_detail
(albums_id,music_id) values
(2,5),
(2,2),
(2,1),
(2,3),
(2,4);
insert into `like`
(user_id,music_id) values 
(1,4),
(3,5),
(2,3);
insert into view
(user_id,music_id,view_datetime) values
(1,3,'2018-04-18 11:45:08'),
(2,1,'2018-04-10 09:49:02'),
(3,3,'2018-03-05 02:15:05'),
(4,4,'2018-03-02 01:20:06'),
(5,3,'2018-02-23 06:33:07'),
(5,1,'2018-01-15 09:25:04');
insert into play_list
(play_list_name,create_date,user_id) values
('peilnwza','2017-04-19',4),
('oatlnwza','2017-04-19',3);
insert into play_list_info
(play_list_id,music_id) values
(1,1),
(2,1),
(1,2),
(2,5),
(2,4),
(1,4);