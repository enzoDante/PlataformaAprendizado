# GIT

## Git init
inicializa um projeto git

## Acessar outros discos no Git Bash
Git Bash é mais recomendável de utilizar os comandos git
Faça: `cd /d` e você estará dentro do disco D:/

## adicionando .gitIgnore
ao criar um arquivo git para ignorar documentos como o abaixo, você pode fazer seus commits e pushs sem preocupações, mas se você fez commit e push sem verificar se tinha o gitignore, faça o seguinte comando na raiz de seu projeto:
`git rm -r --cached .`
`rm`: remove
`-r`: recursivo (outras pastas)
`.`: pasta atual
`--cached`: remove apenas os índices

```md
_# Arquivos de log e temporários_
*.log
*.tmp

_# Arquivos de configuração local_
appsettings.Development.json
.env.local

_# Diretórios de build e pacotes_
bin/
obj/
node_modules/
.next/

_# Arquivos do Visual Studio_
.vs/
*.suo
*.user

_# Arquivos do Rider_
.idea/

_# Arquivos do VS Code_
.vscode/

_# Arquivos do sistema operacional_
.DS_Store
Thumbs.db

# Docker
# Ignora arquivos de build e cache gerados localmente pelo Docker
# .dockerignore
.docker/

# Ignora pastas de volumes de dados locais
/data
/volumes
```

## Adicionar as mudanças
`git add .`

## Commit
`git commit -m "mensagem de commit"`
ou
`git commit -m "titulo curto" -m "descricao detalhada"`

## push
`git push`
`git push -u origin <nome-da-branch>`: origin nome padrão para seu repositório | branch que deseja enviar o push | -u cria atalho de rastreamento
o comando acima é obrigatório para o primeiro push de uma nova branch! assim, nas próximas não precisa fazer isso de novo (isso vale para a `main`)

## clone
* busque a url do repositório a ser clonado (HTTPS ou SSH)
* vá onde deseja clonar o projeto, por exemplo: `cd Documentos/ProjetoClonado`

`git clone <URL_do_repositorio>`
exemplo: `git clone https://github.com/git/git.git`

## status
permite verificar as mudanças do exato momento do projeto
`git status`

## voltar no tempo e desfazer mudanças
`git checkout <nome-do-arquivo>`: desfaz as alterações em um arquivo que ainda não foi adicionado ao `stage` (`git add`), ele restaura o arquivo para o estado do último `commit`

`git reset --soft HEAD~1`: desfaz o último `commit`, mas mantém suas alterações prontas para um novo `commit`

`git revert <hash-do-commit>`: Cria um novo commit que desfaz as alterações de um `commit` anterior, não altera o histórico de mudanças

## Sincronizando com repositório remoto
`git pull`: caso tenha mudança no repositório que ainda não está na sua máquina, faça esse comando para ter ele com você
* baixa as últimas mudanças do repositório remoto e mescla (`merge`) com seu trabalho local
* faça antes de começar a trabalhar para garantir que está com a versão mais recente do projeto

* se você não tem aquela branch, faça `git pull origin <nome-da-branch>` assim você terá aquela branch remota na sua máquina

## Branches (galhos)
* permite que você trabalhe em novas funcionalidades ou correções de bugs de forma isolada do código principal
`git branch <nome-da-branch>`: cria uma nova branch
`git checkout <nome-da-branch>`: muda para a branch que você acabou de criar
`git checkout -b <nome-da-branch>` é um atalho que cria e já muda para a nova branch
`git branch` lista todas as branches locais
`git merge <nome-da-branch>`: combina as mudanças de uma branch para a branch em que você está atualmente, por exemplo, você faria: `git merge feature-login` estando na branch `main` para trazer as mudanças da sua nova funcionalidade

### Conflitos de merge / git push
se ocorrer um conflito, você deve manualmente abrir o arquivo onde tem o conflito e escolher o que deve prevalecer, assim você faz o merge ou o commit junto com push novamente