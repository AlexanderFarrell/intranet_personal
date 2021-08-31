create table item
(
    id         serial primary key,
    created_on timestamptz not null default now(),
    account_id int
                           not null references accounts (id)
);

create table tag
(
    id         serial primary key,
    name       varchar(64) not null,
    created_on timestamptz not null default now(),
    account_id int         not null references accounts (id)
);

create table item_tag_link
(
    id        serial primary key,
    item_id   int  not null references item (id),
    tag_id    int  not null references tag (id),
    is_parent bool not null default false,
    constraint u_item_tag unique (item_id, tag_id)
);

create table item_item_link (
    id serial primary key,
    item_id_a int not null references item (id),
    item_id_b int not null references item (id),
    is_parent bool not null default false,
    constraint u_item_item unique (item_id_a, item_id_b)
);

create or replace function items_by_tag(tag_name varchar(64), username_in varchar(64))
    returns table
            (
                item_id int,
                created_on timestamptz
            )
            language plpgsql
as
    $$
    begin
       return query
           select i.id, i.account_id, i.created_on
           from item_tag_link
                    inner join item i on i.id = item_tag_link.item_id
           where tag_id = (select id from tag where name = tag_name)
             and account_id = (select id from accounts where username = username_in);
    end
    $$;


create or replace function tags_by_item(item_id_in int, username_in varchar(64))
returns table
(
    tag_name varchar(64)
)
language plpgsql
as
$$
begin
    select t.name
    from item_tag_link l
             inner join tag t on t.id = l.tag_id
    where l.item_id = item_id_in
      and t.account_id = (select id from accounts where username = username_in);
end;
$$;


select i.id, i.account_id, i.created_on
from item_tag_link
         inner join item i on i.id = item_tag_link.item_id
where tag_id = (select id from tag where name = 'this')
  and i.account_id = (select id from accounts where username = 'this');

select t.name
from item_tag_link
         inner join tag t on t.id = item_tag_link.tag_id
where item_id = 1
  and t.account_id = (select id from accounts where username = 'this');