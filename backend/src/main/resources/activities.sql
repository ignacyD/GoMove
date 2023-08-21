create table activities
(
    activity_id        uuid         not null
        primary key,
    activity_photo_url varchar(255),
    activity_type      varchar(255) not null
        constraint activities_activity_type_check
            check ((activity_type)::text = ANY
                   ((ARRAY ['WALKING'::character varying, 'CYCLING'::character varying, 'RUNNING'::character varying, 'SKATING'::character varying])::text[])),
    city               varchar(255),
    date               date         not null,
    description        varchar(255),
    street             varchar(255),
    time               time(6)      not null,
    title              varchar(255),
    owner_user_id      uuid         not null
        constraint fkgn46637arn51xbptus32ubal5
            references users
);

alter table activities
    owner to postgres;

INSERT INTO public.activities (activity_id, activity_photo_url, activity_type, city, date, description, street, time, title, owner_user_id) VALUES ('1111e4ee-06f5-40ab-935e-442074f939a1', null, 'RUNNING', 'Radziszow', '2023-09-13', 'Zapraszam na bieganie', 'Prosta', '17:00:00', 'Bieganie z Dominikem', '1111e1a7-7acf-4f50-8275-1449748e96eb');
INSERT INTO public.activities (activity_id, activity_photo_url, activity_type, city, date, description, street, time, title, owner_user_id) VALUES ('2222e4ee-06f5-40ab-935e-442074f939a1', null, 'CYCLING', 'Krzeszowice', '2023-09-14', 'Zapraszam na jazdę na rowerze', 'Bandurskiego', '13:00:00', 'Rowerowanie z Kamilem', '2222e1a7-7acf-4f50-8275-1449748e96eb');
INSERT INTO public.activities (activity_id, activity_photo_url, activity_type, city, date, description, street, time, title, owner_user_id) VALUES ('3333e4ee-06f5-40ab-935e-442074f939a1', null, 'WALKING', 'Orly', '2023-09-16', 'Zapraszam na spacer', 'Sportowa', '20:00:00', 'Spacer z Jakubem', '3333e1a7-7acf-4f50-8275-1449748e96eb');
INSERT INTO public.activities (activity_id, activity_photo_url, activity_type, city, date, description, street, time, title, owner_user_id) VALUES ('4444e4ee-06f5-40ab-935e-442074f939a1', null, 'SKATING', 'Warszawa', '2023-09-15', 'Zapraszam na rolki', 'Niemcewicza', '15:00:00', 'Rolki z Ignacym', '4444e1a7-7acf-4f50-8275-1449748e96eb');
