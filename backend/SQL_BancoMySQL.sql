create database plataprendizado;
use plataprendizado;
create table Usuario(
ID int not null auto_increment primary key,
Foto varchar(255), -- caminho da foto
Nome varchar(100) not null,
Email varchar(100) not null unique,
Senha varchar(255) not null,
Nacesso varchar(50) default 'Cliente', -- Admin  Cliente  Professor  ...
CreatedAt datetime default current_timestamp,
Status varchar(20) default 'Online', -- Online  Offline  Ban  ...
Objetivo text,

index idx_nome (Nome),
index idx_email (Email)
);

create table Refreshtoken(
ID int not null auto_increment primary key,
UsuarioID int not null,
Token varchar(255) not null unique,
CreatedAt datetime default current_timestamp,
Validade datetime not null,
constraint fk_refreshtk foreign key (UsuarioID) references Usuario(ID) on delete cascade,
index idx_token (Token),
index idx_fkrefresh (UsuarioID)
);

create table Curso(
ID int not null auto_increment primary key,
Titulo varchar(200) not null,
Descricao text not null,
Certificado bool default false,
TotalHoras decimal(5,2), -- irá somar as durações da cada aula
TotalAulas int,
CreatedAt datetime default current_timestamp,

index idx_titulo (Titulo),
index idx_certificado (Certificado),
index idx_totalhoras (TotalHoras)
);
create table CursoXUsuario(
UsuarioID int not null,
CursoID int not null,
primary key(UsuarioID, CursoID),
Criador bool default false,
Dificuldade enum('Iniciante', 'Intermediário', 'Avançado') default 'Iniciante',

constraint fk_cursoxusuario_curso foreign key (CursoID) references Curso(ID) on delete cascade,
constraint fk_cursoxusuario_usuario foreign key (UsuarioID) references Usuario(ID) on delete cascade,

index idx_dkcursoxusuario_curso (CursoID),
index idx_fkcursoxusuario_usuario (UsuarioID)
);

create table Aula(
ID int not null auto_increment primary key,
CursoID int not null,
TipoAula varchar(20) default 'Aula', -- Aula  Atividade  Desafio  AtividadeAlternativas
TituloAula varchar(100),
Descricao text not null,
Video varchar(255), -- ------------ caminho do video / youtube
Duracao float,
CreatedAt datetime default current_timestamp,
constraint fk_aula foreign key (CursoID) references Curso(ID) on delete cascade,
index idx_fkaula (CursoID)
);

create table Atividade(
AulaID int not null,
UsuarioID int not null,
primary key (AulaID, UsuarioID),
Resposta text,
constraint fk_atividade_aula foreign key (AulaID) references Aula(ID) on delete cascade,
constraint fk_atividade_usuario foreign key (UsuarioID) references Usuario(ID) on delete cascade,
index idx_fkatividade_aula (AulaID),
index idx_fkatividade_usuario (UsuarioID)
);