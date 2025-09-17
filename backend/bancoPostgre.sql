create table "Usuario"(
	"ID" serial primary key,
	"Nome" varchar(50) not null,
	"Email" varchar(100) not null,
	"Senha" varchar(255) not null,
	"CreatedAt" timestamp with time zone default current_timestamp,
	"NivelAcesso" varchar(50) not null default 'Normal',
	"DataNascimento" date,
	"FotoPerfil" varchar(255)
);

create index idx_user_nome on "Usuario"("Nome");
create index idx_user_email on "Usuario"("Email");
create table "RefreshToken"(
	"ID" serial primary key,
	"IDUsuario" int not null,
	constraint fk_refreshkey foreign key ("IDUsuario") references "Usuario"("ID") on delete cascade,
	"Token" varchar(255) not null,
	"CreatedAt" timestamp with time zone default current_timestamp,
	"Validade" timestamp with time zone,
	"EnderecoIP" varchar(50),
	"Revogado" bool default false
);
create index idx_refreshtk_tk on "RefreshToken"("Token");
create index idx_refreshtk_ip on "RefreshToken"("EnderecoIP");
create index idx_refreshtk_valid on "RefreshToken"("Validade");
create index idx_refreshtk_rev on "RefreshToken"("Revogado");

create table "Jogo"(
	"ID" serial primary key,
	"Titulo" varchar(50) not null,
	"Descricao" text,
	"Certificado" bool,
	"CreatedAt" timestamp with time zone default current_timestamp,
	"UrlImg" varchar(255)
);
create index idx_jogo_nome on "Jogo"("Titulo");

create type dificult as enum('Iniciante', 'Intermediário', 'Avançado');
create table "UsuarioXJogo"(
	"IDUsuario" int not null,
	"IDJogo" int not null,
	"Criador" bool,
	"Dificuldade" dificult,
	constraint fk_uxj_u foreign key ("IDUsuario") references "Usuario"("ID") on delete cascade,
	constraint fk_uxj_j foreign key ("IDJogo") references "Jogo"("ID") on delete cascade,
	"CreatedAt" timestamp with time zone default current_timestamp
);

create table "Mundo"(
	"ID" serial primary key,
	"IDJogo" int not null,
	constraint fk_mundo_j foreign key ("IDJogo") references "Jogo"("ID") on delete cascade,
	"CreatedAt" timestamp with time zone default current_timestamp,
	"TipoMundo" varchar(20) not null,
	"TituloMundo" varchar(50) not null,
	"Descricao" text,
	"Videolink" varchar(255),
	"DuracaoMundo" float,
	"UrlImg" varchar(255)
);
create index idx_mundo_titulo on "Mundo"("TituloMundo");
create index idx_mundo_tipo on "Mundo"("TipoMundo");

create table "Nivel"(
	"ID" serial primary key,
	"IDMundo" int not null,
	constraint fk_nivel_idm foreign key ("IDMundo") references "Mundo"("ID") on delete cascade,
	"Titulo" varchar(50),
	"CreatedAt" timestamp with time zone default current_timestamp,
	"Videolink" varchar(255),
	"Duracao" float,
	"TipoNivel" varchar(50),
	"UrlImg" varchar(255)
);
create index idx_lvl_t on "Nivel"("Titulo");

create table "Desafios"(
	"ID" serial primary key,
	"IDNivel" int not null,
	constraint fk_desafio_idn foreign key ("IDNivel") references "Nivel"("ID") on delete cascade,
	"NomeDesafio" varchar(50) not null,
	"Descricao" text,
	"Videolink" varchar(255),
	"CreatedAt" timestamp with time zone default current_timestamp,
	"UrlImg" varchar(255)
);
create index idx_desafio_nome on "Desafios"("NomeDesafio");

create table "DesafioXUsuario"(
	"ID" serial primary key,
	"IDUsuario" int not null,
	"IDDesafio" int not null,
	constraint fk_dxu_u foreign key ("IDUsuario") references "Usuario"("ID") on delete cascade,
	constraint fk_dxu_d foreign key ("IDDesafio") references "Desafios"("ID") on delete cascade,
	"CreatedAt" timestamp with time zone default current_timestamp,
	"Resposta" text,
	"Acertou" bool
);