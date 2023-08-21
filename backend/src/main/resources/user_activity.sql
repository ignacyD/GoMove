create table user_activity
(
    user_id     uuid not null
        constraint fks41is1raa3f0y5q5g0pw2rfd4
            references users,
    activity_id uuid not null
        constraint fk1asjhy33yuwecrwv04l5ep1me
            references activities,
    primary key (user_id, activity_id)
);

alter table user_activity
    owner to postgres;

INSERT INTO public.user_activity (user_id, activity_id) VALUES ('2222e1a7-7acf-4f50-8275-1449748e96eb', '1111e4ee-06f5-40ab-935e-442074f939a1');
INSERT INTO public.user_activity (user_id, activity_id) VALUES ('1111e1a7-7acf-4f50-8275-1449748e96eb', '1111e4ee-06f5-40ab-935e-442074f939a1');
