use beat_up;
insert into user 
(user_name,user_lastname,user_email,password) values
('taew','leader','leader@email.com','123456789'),
('ton','lnwza','ton@email.com','987654321'),
('oat','rawat','rawat@email.com','zxc123'),
('pei','hello','hello@email.com','123asd'),
('binarynman','helloworld','binarynman@email.com','789qwe');
insert into music 
(music_name,music_artist,music_moods,music_genres,music_local, upload_date,user_id) values
('First Lady','Peck Palitchok',3,3, 'First Lady - Pek Palit.mp3','2018-02-04',2),
('GALAXY','D Gerrard',2,3,'GALAXY - D GERRARD ft. Kob The X Factor.mp3','2018-03-29',3),
('Good morning teacher','Atom',1,3,'Good Morning Teacher.mp3','2018-03-14',0),
('มะงึกๆอุ๋งๆ','ORNLY YOU',3,1,'ORNLY YOU.mp3','2018-04-20',1),
('Shonichi','BNK48',3,1,'Shonichi - BNK48.mp3','2018-05-01',0),
('นอนได้แล้ว','THE TOYS',4,3,'นอนได้แล้ว - THE TOYS feat. ฟักกลิ้ง ฮีโร่.mp3','2018-02-04',1),
('ภาพจำ','ป็อป ปองกูล',1,3,'ภาพจำ - ป๊อป ปองกูล.mp3','2018-02-10',2),
('ร้อยล้านวิว','STAMP',1,1,'ร้อยล้านวิว - STAMP.mp3','2018-04-04',3),
('ระหว่างที่เธอจะจากไป','ว่าน ธนกฤต feat.Moving and Cut',1,3,'ระหว่างที่เธอจะจากไป -  Wan Soloist feat.Moving and Cut.mp3','2018-05-18',4);
insert into genres
(genres_name) values
('Pop'),
('Rock'),
('R&B'),
('Jass'),
('Hiphop'),
('Acoustic'),
('Indy');
insert into moods
(moods_name) values
('Sad'),
('Love'),
('Happy'),
('Relax');
insert into albums
(albums_name,picture_albums,user_id) values
('First Lady','firstlady-01.png',1),
('ZERO EP','D-Gerrard.jpg',2),
('Cyantist','1318647271-Cyantist.jpg',2),
('มะงึกๆอุ๋งๆ','oong.jpg',1),
('Shonichi - วันแรก (Type B) - EP','วันเเรก-01.png',1),
('นอนได้แล้ว - single','นอนได้แล้ว-Sleep-Now.jpg',1),
(' ภาพจำ (Live Session)','ภาพจำ-ป๊อบ-ปองกูล.jpg',2),
('ร้อยล้านวิว - Single','ร้อยล้าน-01.png',1),
('ALONEVERA','wan-01.png',2);
insert into albums_detail
(albums_id,music_id) values
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6),
(7,7),
(8,8),
(9,9);
insert into `like`
(user_id,music_id) values 
(1, 4),
(3, 5),
(2, 3),
(2, 4),
(5, 4),
(3, 5),
(4, 8);
insert into view
(user_id,music_id,view_datetime) values
(1,3,'2018-04-18 11:45:08'),
(2,1,'2018-04-10 09:49:02'),
(3,3,'2018-03-05 02:15:05'),
(4,4,'2018-03-02 01:20:06'),
(5,3,'2018-02-23 06:33:07'),
(5,1,'2018-01-15 09:25:04');
insert into play_list
(play_list_name,user_id) values
('01',1),
('02',2),
('03',3),
('04',4),
('05',5);
insert into play_list_info
(play_list_id,music_id) values
(1,1),
(1,2),
(1,3),
(2,5),
(2,4),
(2,3);

SELECT music.music_id, music_name,music_local, music_artist,upload_date,picture_albums, COUNT(`like`.user_id) FROM `like`
        left join music
        on `like`.music_id = music.music_id
        left join albums_detail
        on `like`.music_id = albums_detail.music_id
        left join albums
        on albums_detail.albums_id = albums.albums_id
        GROUP BY music.music_id
        ORDER BY COUNT(`like`.user_id) DESC LIMIT 10;
        
SELECT * FROM `like` ORDER BY user_id ASC;

