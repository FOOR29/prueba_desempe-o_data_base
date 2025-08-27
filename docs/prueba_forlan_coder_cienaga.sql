create database prueba_forlan_coder_cienaga;
use prueba_forlan_coder_cienaga;

create table productions (
id_production int auto_increment primary key not null,
production float,
date_time datetime,
creation_date timestamp default current_timestamp,
update_date timestamp default current_timestamp on update current_timestamp
);


create table maintenance (
id_maintenance int auto_increment primary key not null,
maintenance_date date default null,
worth float not null,
creation_date timestamp default current_timestamp,
update_date timestamp default current_timestamp on update current_timestamp
);


create table sensors (
id_sensor varchar(50) not null primary key not null,
sensor_type varchar(100) not null,
sensor_status enum("Active","Inactive","Faulty"),
id_maintenance int,
foreign key (id_maintenance) references maintenance(id_maintenance) on delete set null on update cascade,
creation_date timestamp default current_timestamp,
update_date timestamp default current_timestamp on update current_timestamp
);


create table crops (
id_crop int auto_increment primary key not null,
crop_type varchar(100) not null,
crop_variety varchar(200) default null,
soil_type varchar(100),
irrigation_system varchar(100) not null,
fertelizer_used varchar(200),
organic enum("Yes","No"),
id_production int,
id_sensor varchar(50),
foreign key (id_production) references productions(id_production) on delete set null on update cascade,
foreign key (id_sensor) references sensors(id_sensor) on delete set null on update cascade,
creation_date timestamp default current_timestamp,
update_date timestamp default current_timestamp on update current_timestamp
);


create table famrs (
id_farm int auto_increment primary key not null,
farm_name varchar(100) not null,
region varchar(100) default null,
id_crop int,
foreign key (id_crop) references crops(id_crop) on delete set null on update cascade,
creation_date timestamp default current_timestamp,
update_date timestamp default current_timestamp on update current_timestamp
);

