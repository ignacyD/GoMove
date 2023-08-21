create table users
(
    user_id            uuid not null
        primary key,
    city               varchar(255),
    description        varchar(255),
    gender             varchar(255),
    password           varchar(255),
    preferred_activity varchar(255)
        constraint users_preferred_activity_check
            check ((preferred_activity)::text = ANY
                   ((ARRAY ['WALKING'::character varying, 'CYCLING'::character varying, 'RUNNING'::character varying, 'SKATING'::character varying])::text[])),
    role               varchar(255)
        constraint users_role_check
            check ((role)::text = ANY ((ARRAY ['USER'::character varying, 'ADMIN'::character varying])::text[])),
    user_email         varchar(255),
    user_name          varchar(255),
    user_photo_url     varchar(255)
);

alter table users
    owner to postgres;

INSERT INTO public.users (user_id, city, description, gender, password, preferred_activity, role, user_email, user_name, user_photo_url) VALUES ('1111e1a7-7acf-4f50-8275-1449748e96eb', 'Radziszow', null, null, '$2a$10$19SYyWc9NADHrsXaXJ4c7eP5xTYXAoww87aYfcLuV0BW4IvtpPhP2', null, 'USER', 'dominik@gmail.com', 'dominik', null);
INSERT INTO public.users (user_id, city, description, gender, password, preferred_activity, role, user_email, user_name, user_photo_url) VALUES ('4444e1a7-7acf-4f50-8275-1449748e96eb', 'Warszawa', null, null, '$2a$10$zR5II9bFsNjII98zLAN2Y.vnv3rmT4ItTOVX.YWmzJcaBmT2IdfA.', null, 'USER', 'ignacy@gmail.com', 'ignacy', null);
INSERT INTO public.users (user_id, city, description, gender, password, preferred_activity, role, user_email, user_name, user_photo_url) VALUES ('2222e1a7-7acf-4f50-8275-1449748e96eb', 'Krzeszowice', null, null, '$2a$10$.ol1HNKpiKhK/0d/SSxeGu1ypuCJnLljDKMpOzXRFQakBlqF/9MKS', null, 'USER', 'kamil@gmail.com', 'kamil', null);
INSERT INTO public.users (user_id, city, description, gender, password, preferred_activity, role, user_email, user_name, user_photo_url) VALUES ('3333e1a7-7acf-4f50-8275-1449748e96eb', 'Orly', null, null, '$2a$10$NoTLdHc0YJtbw4spWUpMtucH6pl9URt0q13N3AxZmmaasFrcsZ2Ry', null, 'USER', 'jakub@gmail.com', 'jakub', null);
