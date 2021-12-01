**Tode CLI**
====
CLI tool for scaffolding Node API  
[![Version](https://img.shields.io/npm/v/tode-cli.svg)](https://www.npmjs.com/package/tode-cli)
[![Downloads/week](https://img.shields.io/npm/dw/tode-cli.svg)](https://npmjs.org/package/tode-cli)
[![License](https://img.shields.io/npm/l/tode-cli.svg)](https://github.com/taslangraham/tode-cli/blob/main/package.json)

<!-- toc -->
* [**Features**](#features)
* [**Usage**](#usage)
* [**Commands**](#commands)
* [**Database**](#database)

# **Features**
* Sccaffolds a NodeJs API project
* Ability to generate Controllers (routes)
    * Routes are auto registered when you create a controller (no need for you use ```app.use('..')``` anymore )
* Ability to Models that maps to database tables
* Ability to generate Service files
* Ability to to add JWT based authentication to your app with a single command
* Comes with Knex.js Built in
* Comes with an easy to use ORM, [Objection.js](https://vincit.github.io/objection.js/)
    * Objection.js is built ontop on Knex.js to allow easy database operations
* 100% Typescript [:wink:]

# **Usage**

```
$ npm install -g tode-cli
$ tode create-project hello-world
```
<!-- usagestop -->
# **Commands**
<!-- commands -->
* [`tode create-project PROJECT NAME`](#tode-create-project-project-name)
* [`tode add:controller CONTROLLER_NAME`](#tode-addcontroller-controller_name)
* [`tode add:model MODEL_NAME`](#tode-addmodel-model_name)
* [`tode add:resource RESOURCE_NAME`](#tode-addresource-resource_name)
* [`tode add:service SERVICE_NAME`](#tode-addservice-service_name)
* [`tode add:auth`](#tode-addauth)
* [`tode help [COMMAND]`](#tode-help-command)

## `tode create-project PROJECT_NAME`

Scaffolds a fresh Tode project

```
USAGE
  $ tode create-project PROJECT_NAME

ARGUMENTS
  PROJECT NAME  Name of project to create

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  tode create-project myNewProject
```






## `tode add:controller CONTROLLER_NAME`

Adds a controller to the application

```
USAGE
  $ tode add:controller CONTROLLER_NAME

ARGUMENTS
  CONTROLLER_NAME  Name of controller to create

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ tode ac

EXAMPLE
  tode add:controller <controller_name>
```


## `tode add:model MODEL_NAME`

adds a new Databse Model

```
USAGE
  $ tode add:model MODEL_NAME

ARGUMENTS
  MODEL_NAME  Name of model to create

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ tode am

EXAMPLE
  tode add:model model_name
```


## `tode add:resource RESOURCE_NAME`

adds a complete resource (mode, controller, service

```
USAGE
  $ tode add:resource RESOURCE_NAME

ARGUMENTS
  RESOURCE_NAME  Name of resource to create

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ tode rs

EXAMPLE
  tode add:resource resource_name
```


## `tode add:service SERVICE_NAME`

adds a new service

```
USAGE
  $ tode add:service SERVICE_NAME

ARGUMENTS
  SERVICE_NAME  Name of service to create

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ tode as

EXAMPLE
  tode add:service service_name
```


## `tode add:auth`

adds JWT authentication

```
USAGE
  $ tode add:auth

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ tode aa
```


## `tode help [COMMAND]`

display help for tode

```
USAGE
  $ tode help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```


# **Database**
## **Objection.js**
Tode leverage's the [Objection.js](https://vincit.github.io/objection.js/) ORM, and Knex.js query builder.  

Objection.js is an ORM (opens new window)for Node.js (opens new window)that aims to stay out of your way and make it as easy as possible to use the full power of SQL and the underlying database engine while still making the common stuff easy and enjoyable.  


Even though ORM is the best commonly known acronym to describe objection, a more accurate description is to call it a relational query builder. You get all the benefits of an SQL query builder but also a powerful set of tools for working with relations.  

Objection.js is built on an SQL query builder called knex (opens new window). All databases supported by knex are supported by objection.js. SQLite3, Postgres and MySQL are thoroughly tested (opens new window).  

   
The underlying databse connection is setup up using Knex.js, and the top level ORM functionalities are done using Objection.js.  

You can read more here to learn how Objection.js works with knex.js.  


## **Knex.js**
Tode uses [knex.js](https://knexjs.org/) to create migrations and seeders. All knex.js commands are available in tode.js.
## **Models**
Tode's models are Objection.js models. [Read more here.](https://vincit.github.io/objection.js/guide/models.html).  
The ``tableName`` property on model holds the name of the table that the model maps to. This property is a requeired property on all models.  
Model relationships  - https://vincit.github.io/objection.js/guide/relations.html
Tode uses [knex.js](https://knexjs.org/) to create migrations and seeders. All knex.js commands are available in tode.js.
## **Configuring Database connection**
You also need to install one of the following drivers depending on the database you want to use:

```bash
npm install pg
npm install sqlite3
npm install mysql
npm install mysql2
```
Configure Knex connection in the ```knexfile.ts``` file. Read about the ```knexfile``` [here](https://knexjs.org/#knexfile)

```
export default {

  development: {
    client: "", //name of the client installed
    connection: {
      database: "",
      user: "",
      password: "",
      port: "",
    },
    seeds: {
      directory: 'src\\data-access\\seeds'
    },
    migrations: {
      tableName: "knex_migrations",
      directory: 'src\\data-access\\migrations',
    },
  },

  production: {
    client: "",
    connection: {
      database: "",
      user: "",
      password: "",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "",
    },
  },

};
```