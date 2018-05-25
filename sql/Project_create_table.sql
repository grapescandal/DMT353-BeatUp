drop database if exists beat_up;
create database beat_up;
use beat_up;
create table user(
	user_id int primary key auto_increment,
    user_name varchar(50) not null,
    user_lastname varchar(50) not null,
    user_email varchar(50) not null,
    password nvarchar(20) not null
);
create table music(
	music_id int primary key auto_increment,
    music_name varchar(50) not null,
    music_artist varchar(50) not null,
    music_moods int not null,
    music_genres int not null,
    music_local varchar(100),
    upload_date date,
	user_id int not null
);
create table genres(
	genres_id int primary key auto_increment,
    genres_name varchar(50) not null
);
create table moods(
	moods_id int primary key auto_increment,
    moods_name varchar(50) not null
);
create table albums(
	albums_id int primary key auto_increment,
    albums_name varchar(50) not null,
    picture_albums varchar(100),
    user_id int
);
create table albums_detail(
	albums_id int,
    music_id int
);
create table `like`(
	user_id int not null,
    music_id int not null
);
create table view(
	user_id int not null,
    music_id int not null
);
create table play_list(
	play_list_id int primary key auto_increment,
    user_id int unique,
	play_list_name varchar(50)
);
create table play_list_info(
	play_list_id int not null,
    music_id int not null
);
