# NerdMapas BR [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm version](https://img.shields.io/badge/npm-11.6.2-blue?style=flat)](https://www.npmjs.com/package/npm?activeTab=versions)
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js Badge">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind Badge">
<img src="https://img.shields.io/badge/sqlite-000000?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite Badge">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Badge">
</p>

<p align="center">
  Teste técnico para a vaga de Estágio em Desenvolvimento na <a href="https://nerdmonster.com/">NerdMonster</a>.
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-layout">Layout</a> •
  <a href="#-como-executar">Como Executar</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-autor">Autor</a>
</p>

## 💻 Sobre o projeto

O **NerdMapas BR** é uma aplicação web desenvolvida para gerenciar mapas e pontos de interesse (POIs). O projeto permite a criação de mapas personalizados baseados em cidades reais, utilizando serviços de geolocalização para definir limites geográficos e interatividade completa.

## ⚙️ Funcionalidades

-  **Criação de Mapas:** Gera mapas a partir do endereço de uma cidade (ex: “Rio de Janeiro, RJ”).  
-  **Geocoding:** Busca automática de coordenadas e limites geográficos (bounds) via API do **[Nominatim](https://nominatim.openstreetmap.org/ui/about.htmlhttps://nominatim.openstreetmap.org/ui/about.html)**.  
-  **Interatividade:** Exibição de mapa interativo utilizando **[MapLibre](https://maplibre.org/)** .  
- **Gerenciamento de POIs:** Adição e visualização de pontos de interesse dentro do mapa.  
-  **Persistência de Dados:** API interna **[(Next.js)](https://nextjs.org/)** para salvar e recuperar informações.  

## 📝 Como executar

### 🚧 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) (Recomendado: Versão LTS)
- [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 
(Recomendado: 11.6.2 )
### 🎲 Rodando a aplicação

```bash
# Clone este repositório
$ git clone https://github.com/pedro-seco/nextjs-NerdMapasBr

# Acesse a pasta do projeto no terminal/cmd
$ cd nerdmapas-br

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor iniciará na porta:3000 - acesse http://localhost:3000
# npm run dev -p <port> - caso queira outra porta  
```  

## 🖥️ Stack

### Backend

- **[React:](https://pt-br.legacy.reactjs.org/)** Biblioteca principal para construção da interface.
- **[Next.js:](https://nextjs.org/)** Framework React utilizado para rotas, renderização e otimização.
- **[Tailwind CSS:](https://tailwindcss.com/)** Framework de utilitários para estilização rápida e responsiva.
- **[React MapLibre GL:](https://visgl.github.io/react-maplibre/docs)** Biblioteca para renderização dos mapas interativos.
- **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript para tipagem estática e segurança no código.

### Frontend

- **[Next.js](https://nextjs.org/) API Routes:** Criação de endpoints da API em Typescript (Backend-for-Frontend).
- **[Nominatim API:](https://nominatim.openstreetmap.org/ui/about.htmlhttps://nominatim.openstreetmap.org/ui/about.html)** Serviço externo utilizado para geocoding (busca de endereços e coordenadas).
- **[Swagger / OpenAPI:](https://swagger.io/)** Documentação interativa das rotas da API (visível na pasta `api/openapi`).

### Estruturas de Dados e Relacionamentos  

- **[Prisma ORM:](https://www.prisma.io/)** Ferramenta para facilitar a interação e modelagem do banco de dados.
- **[SQLite:](https://sqlite.org/index.html)** Banco de dados relacional leve e baseado em arquivo, ideal para este tipo de projeto.

## 🚀 Funcionalidades  

- **Manipulação de Pontos:** Criar, Listar, Visualizar e excluir pontos.
- **Manipulação de Mapas:** Criar, Listar, Visualizar e excluir mapas.
- **Mapa Interativo:** Criação e visualização de pontos a um clique de distância.
- **API Documentada:** Swagger acessível em `/docs`  

## 📂 Estrutura do Projeto
```
nerdmapas-br/
📂 app/             	        # App Router Principal
├── 📂 ui/         	            # Interface do Usuário (Group Route)
│   ├── 📂 (routes)/ 		    # Páginas e rotas de navegação
│   ├── 📂 components/	        # Componentes reutilizáveis (Mapas, Inputs)
│   ├── 📂 services/ 		    # Camada de serviços e fetch de dados
│   ├── 📂 styles/   		    # Arquivos de estilização global
│   ├── 📂 types/    		    # Definições de tipos TypeScript
├── 📂 api/          		    # API Routes (Backend Next.js)
│   ├── 📂 maps/     		    # Endpoints para gestão de mapas
│   ├── 📂 points/   		    # Endpoints para gestão de POIs
│   ├── 📂 openapi/  		    # Especificações/Docs da API
│   └── 📂 helper/   		    # Helpers e utilitários da API
├── 📂 lib/          		    # Configurações de bibliotecas (Prisma, Utils)
├── 📜scripts_definition.sql	# Exemplo de criação de bancos feitos pelo PRISMA em SQL puro (DDL)
└── 📜scripts_example.sql	    # Exemplos de queries que estão sendo executadas pelo PRISMA  (DML)
```

## 🎨 Layout

### Landing Page 

### Criar Mapas  

### Mapa Interativo  

### Criar Pontos  

### Editar Pontos  # NerdMapas BR [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm version](https://img.shields.io/badge/npm-11.6.2-blue?style=flat)](https://www.npmjs.com/package/npm?activeTab=versions)
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js Badge">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind Badge">
<img src="https://img.shields.io/badge/sqlite-000000?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite Badge">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Badge">
</p>

<p align="center">
  Teste técnico para a vaga de Estágio em Desenvolvimento na <a href="https://nerdmonster.com/">NerdMonster</a>.
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-layout">Layout</a> •
  <a href="#-como-executar">Como Executar</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-autor">Autor</a>
</p>

## 💻 Sobre o projeto

O **NerdMapas BR** é uma aplicação web desenvolvida para gerenciar mapas e pontos de interesse (POIs). O projeto permite a criação de mapas personalizados baseados em cidades reais, utilizando serviços de geolocalização para definir limites geográficos e interatividade completa.

## ⚙️ Funcionalidades

-  **Criação de Mapas:** Gera mapas a partir do endereço de uma cidade (ex: “Rio de Janeiro, RJ”).  
-  **Geocoding:** Busca automática de coordenadas e limites geográficos (bounds) via API do **[Nominatim](https://nominatim.openstreetmap.org/ui/about.htmlhttps://nominatim.openstreetmap.org/ui/about.html)**.  
-  **Interatividade:** Exibição de mapa interativo utilizando **[MapLibre](https://maplibre.org/)** .  
- **Gerenciamento de POIs:** Adição e visualização de pontos de interesse dentro do mapa.  
-  **Persistência de Dados:** API interna **[(Next.js)](https://nextjs.org/)** para salvar e recuperar informações.  

## 📝 Como executar

### 🚧 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) (Recomendado: Versão LTS)
- [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 
(Recomendado: 11.6.2 )
### 🎲 Rodando a aplicação

```bash
# Clone este repositório
$ git clone https://github.com/pedro-seco/nextjs-NerdMapasBr

# Acesse a pasta do projeto no terminal/cmd
$ cd nerdmapas-br

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor iniciará na porta:3000 - acesse http://localhost:3000
# npm run dev -p <port> - caso queira outra porta  
```  

## 🖥️ Stack

### Backend

- **[React:](https://pt-br.legacy.reactjs.org/)** Biblioteca principal para construção da interface.
- **[Next.js:](https://nextjs.org/)** Framework React utilizado para rotas, renderização e otimização.
- **[Tailwind CSS:](https://tailwindcss.com/)** Framework de utilitários para estilização rápida e responsiva.
- **[React MapLibre GL:](https://visgl.github.io/react-maplibre/docs)** Biblioteca para renderização dos mapas interativos.
- **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript para tipagem estática e segurança no código.

### Frontend

- **[Next.js](https://nextjs.org/) API Routes:** Criação de endpoints da API em Typescript (Backend-for-Frontend).
- **[Nominatim API:](https://nominatim.openstreetmap.org/ui/about.htmlhttps://nominatim.openstreetmap.org/ui/about.html)** Serviço externo utilizado para geocoding (busca de endereços e coordenadas).
- **[Swagger / OpenAPI:](https://swagger.io/)** Documentação interativa das rotas da API (visível na pasta `api/openapi`).

### Estruturas de Dados e Relacionamentos  

- **[Prisma ORM:](https://www.prisma.io/)** Ferramenta para facilitar a interação e modelagem do banco de dados.
- **[SQLite:](https://sqlite.org/index.html)** Banco de dados relacional leve e baseado em arquivo, ideal para este tipo de projeto.

## 🚀 Funcionalidades  

- **Manipulação de Pontos:** Criar, Listar, Visualizar e excluir pontos.
- **Manipulação de Mapas:** Criar, Listar, Visualizar e excluir mapas.
- **Mapa Interativo:** Criação e visualização de pontos a um clique de distância.
- **API Documentada:** Swagger acessível em `/docs`  

## 📂 Estrutura do Projeto
```
nerdmapas-br/
📂 app/             	        # App Router Principal
├── 📂 ui/         	            # Interface do Usuário (Group Route)
│   ├── 📂 (routes)/ 		    # Páginas e rotas de navegação
│   ├── 📂 components/	        # Componentes reutilizáveis (Mapas, Inputs)
│   ├── 📂 services/ 		    # Camada de serviços e fetch de dados
│   ├── 📂 styles/   		    # Arquivos de estilização global
│   ├── 📂 types/    		    # Definições de tipos TypeScript
├── 📂 api/          		    # API Routes (Backend Next.js)
│   ├── 📂 maps/     		    # Endpoints para gestão de mapas
│   ├── 📂 points/   		    # Endpoints para gestão de POIs
│   ├── 📂 openapi/  		    # Especificações/Docs da API
│   └── 📂 helper/   		    # Helpers e utilitários da API
├── 📂 lib/          		    # Configurações de bibliotecas (Prisma, Utils)
├── 📜scripts_definition.sql	# Exemplo de criação de bancos feitos pelo PRISMA em SQL puro (DDL)
└── 📜scripts_example.sql	    # Exemplos de queries que estão sendo executadas pelo PRISMA  (DML)
```

## 🎨 Layout

### Landing Page 

### Criar Mapas  

### Mapa Interativo  

### Criar Pontos  

### Editar Pontos  