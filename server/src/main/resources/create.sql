drop database if exists `friend`;
create database `friend`;

use friend;

drop table if exists `friend`;
create table `friend`
(
    id    int auto_increment primary key,
    name  char(20) not null,
    sex   char(1),
    phone char(20),
    qq    char(20)

) engine = INNODB
  auto_increment = 1001;

drop table if exists `admin`;
create table `admin`
(
    id       char(20) primary key,
    password char(100) not null
);

ALTER TABLE `admin` RENAME TO `administrator`;