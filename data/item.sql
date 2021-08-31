create table item (
    id serial primary key,
    created_on timestamptz not null default now(),
    account_id int
        not null references accounts(id)
);

create table tag (
    id serial primary key,
    name varchar(64) not null,
    created_on timestamptz not null default now(),
    account_id int not null references accounts(id)
);

create table item_tag_link (
    id serial primary key,
    item_id int not null references item(id),
    tag_id int not null references tag(id),
    is_parent bool not null default false,
    constraint u_item_tag unique (item_id, tag_id)
);