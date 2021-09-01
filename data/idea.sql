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
    procedure add_idea(username_in varchar(64), title_in varchar(150), content_in text)
    language plpgsql
as
$$
declare
    item_id_out int;
begin
    insert into item (account_id)
    values ((select id from accounts where username = username_in))
    returning id into item_id_out;
    insert into idea (title, content, item_id)
    VALUES (title_in, content_in, item_id_out);
end;
$$;

select i.id, i.title, i.content, d.created_on
from items_by_tag('this', 'Alex') d
         inner join idea i on i.item_id = d.item_id;


select t.name
from tags_by_item((select item_id from idea where id = 1), 'Alex') t;


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
        where account_id = (select id
                            from accounts
                            where username = username_in);
end;
$$