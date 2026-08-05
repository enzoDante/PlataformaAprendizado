create table users(
	id int generated always as identity primary key,
	public_id UUID unique not null default gen_random_uuid(),
	username varchar(50) not null unique,
	email varchar(100) not null unique,
	password varchar(255) not null,
	created_at timestamp with time zone default current_timestamp,
	access_level varchar(50) not null default 'Normal',
	birthdate date
);
create index idx_public_id on users(public_id);

create table refresh_token(
	id int generated always as identity primary key,
	user_id int not null,
	constraint fk_ref_tok_user_id foreign key (user_id) references users(id) on delete cascade,
	token varchar(255) not null unique,
	created_at timestamp with time zone default current_timestamp,
	expires_at timestamp with time zone,
	ip_address varchar(50),
	is_revoked bool default false
);
create index idx_token on refresh_token(token);
create index idx_expires_at on refresh_token(expires_at);

create table user_game_stats(
	id int generated always as identity primary key,
	user_id int not null,
	constraint fk_usergamestat_userid foreign key (user_id) references users(id) on delete cascade,
	lives int not null default 3 check (lives >= 0 and lives <= 5),
	experience_points int not null default 0 check (experience_points >= 0),
	level int not null default 1 check (level >= 1),
	coins int not null default 0 check (coins >= 0),
	streak_days int not null default 0 check (streak_days >= 0),
	last_activity_date date,
	updated_at timestamp with time zone default current_timestamp,
	unique(user_id)
);
create index idx_user_gamestats_userid on user_game_stats(user_id);

create table achievements(
	id int generated always as identity primary key,
	code varchar(50) unique not null, -- 'primeiro curso', 'jogando por 7 dias'
	name varchar(100) not null,
	description text,
	icon_url text, -- depois quero criar sistema de upload de imagens
	points int not null default 0
);
create table user_achievements(
	id int generated always as identity primary key,
	user_id int not null,
	achievement_id int not null,
	unlocked_at timestamp with time zone default current_timestamp,
	unique(user_id, achievement_id),
	constraint fk_user_achievement_userid foreign key (user_id) references users(id) on delete cascade,
	constraint fk_user_achievement_achid foreign key (achievement_id) references achievements(id)
);

create table game(
	id int generated always as identity primary key,
	tittle varchar(50) not null,
	description text,
	certification bool,
	dificult varchar(50) default 'Iniciante',
	created_at timestamp with time zone default current_timestamp,
	url_img text
);
create index idx_game_tittle on game(tittle);

create table users_games(
	id int generated always as identity primary key,
	user_id int not null,
	game_id int not null,
	unique (user_id, game_id),
	creator bool default false,
	complete bool default false,
	created_at timestamp with time zone default current_timestamp,
	constraint fk_usersgames_userid foreign key (user_id) references users(id) on delete cascade,
	constraint fk_usersgames_gameid foreign key (game_id) references game(id) on delete cascade
);
-- todo "game" tem várias sections
create table sections(
	id int generated always as identity primary key,
	game_id int not null,
	section_tittle varchar(50) not null,
	description text,
	media_url text,
	media_duration float,
	image_url text,
	priority int not null default 1,
	created_at timestamp with time zone default current_timestamp,
	updated_at timestamp with time zone default current_timestamp,
	constraint fk_sec_gameid foreign key (game_id) references game(id) on delete cascade
);
create index idx_section_tittle on sections(section_tittle);
-- toda "section" tem vários níveis/aula
create table class_level(
	id int generated always as identity primary key,
	section_id int not null,
	class_tittle varchar(50),
	description text,
	media_url text,
	media_duration float,
	image_url text,
	experience int default 0,
	is_lesson bool default false, -- se "true" é um desafio que deve ser resolvido
	priority int not null default 1,
	created_at timestamp with time zone default current_timestamp,
	updated_at timestamp with time zone default current_timestamp,
	constraint fk_class_secid foreign key (section_id) references sections(id) on delete cascade
);

-- se "class_level" é um "lesson" usuário irá responder na tabela abaixo
create table user_lesson(
	id int generated always as identity primary key,
	user_id int not null,
	class_id int not null,
	unique (user_id, class_id),
	user_resolution text not null,
	experience int default 0,
	anwser_correct bool default false,
	complete bool default false,
	created_at timestamp with time zone default current_timestamp,
	updated_at timestamp with time zone default current_timestamp,
	constraint fk_userlesson_userid foreign key (user_id) references users(id) on delete cascade,
	constraint fk_userlesson_classid foreign key (class_id) references class_level(id) on delete cascade
);

INSERT INTO achievements (code, name, description, icon_url, points) VALUES
('STREAK_10', '10 dias seguidos', 'Estudou por 10 dias consecutivos', '', 50),
('PHASE_3_COMPLETE', 'Terceira fase concluída', 'Concluiu a fase 3 do curso', '', 100),
('NO_MISTAKES_5', 'Sem erros', 'Completou 5 tarefas sem cometer erros', '', 30);
