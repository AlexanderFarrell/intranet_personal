create table accounts (
                          id serial primary key,
                          username varchar(64) not null unique,
                          password varchar(128) not null
);

create or replace view account_exists as
    (select count(*) > 0 as exists
    from accounts);

select * from account_exists where username;