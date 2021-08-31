create table idea
(
    id      serial primary key,
    title   varchar(150) not null,
    content text         not null,
    item_id int          not null references item (id)
);

create view idea_item as
(
select d.id, d.title, d.content, i.created_on, i.account_id
from idea d
         inner join item i on d.item_id = i.id);

create or replace
    function ideas_tagged(username_in varchar(64), tag_in varchar(150))
    returns table
            (
                id         int,
                title      text,
                content    text,
                created_on timestamptz
            )
    language plpgsql
as
$$
begin
    return query
        select id, title, content, created_on
        from idea_item
        where account_id = (select id from accounts
            where username=username_in);
end;
$$