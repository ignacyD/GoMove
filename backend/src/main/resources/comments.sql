create table comments
(
    comment_id   uuid    not null
        primary key,
    activity_id  uuid    not null,
    date         date    not null,
    message      varchar(255),
    time         time(6) not null,
    user_user_id uuid    not null
        constraint fkcc96r34gkial9e3fxphcr3abt
            references users
);

alter table comments
    owner to postgres;

INSERT INTO public.comments (comment_id, activity_id, date, message, time, user_user_id) VALUES ('11110b30-7557-4a9f-8527-3e50e933fec4', '1111e4ee-06f5-40ab-935e-442074f939a1', '2023-08-21', 'Robimy grila na koniec?', '10:08:41', '2222e1a7-7acf-4f50-8275-1449748e96eb');
INSERT INTO public.comments (comment_id, activity_id, date, message, time, user_user_id) VALUES ('22220b30-7557-4a9f-8527-3e50e933fec4', '1111e4ee-06f5-40ab-935e-442074f939a1', '2023-08-21', 'No pewnie że tak !', '10:08:41', '1111e1a7-7acf-4f50-8275-1449748e96eb');
INSERT INTO public.comments (comment_id, activity_id, date, message, time, user_user_id) VALUES ('33330b30-7557-4a9f-8527-3e50e933fec4', '1111e4ee-06f5-40ab-935e-442074f939a1', '2023-08-21', 'To ja wezme ketchup.', '10:08:41', '3333e1a7-7acf-4f50-8275-1449748e96eb');
INSERT INTO public.comments (comment_id, activity_id, date, message, time, user_user_id) VALUES ('44440b30-7557-4a9f-8527-3e50e933fec4', '2222e4ee-06f5-40ab-935e-442074f939a1', '2023-08-21', 'Na pewno aktualne?', '10:08:41', '4444e1a7-7acf-4f50-8275-1449748e96eb');
