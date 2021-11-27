**tode**
====


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/tode.svg)](https://npmjs.org/package/tode-cli)
<!-- [![Downloads/week](https://img.shields.io/npm/dw/tode.svg)](https://npmjs.org/package/tode) -->
[![License](https://img.shields.io/npm/l/tode.svg)](https://github.com/tode/tode/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# **Usage**
<!-- usage -->
To run locally

``` bash
npm install
npm link
tode create-project hello-world
```
<!-- usagestop -->
# **Commands**
<!-- commands -->
* [`tode add:controller <CONTROLLER_NAME>`](#tode-addcontroller-controller_name)
* [`tode add:model <MODEL_NAME>`](#tode-addmodel-model_name)
* [`tode add:resource <RESOURCE_NAME>`](#tode-addresource-resource_name)
* [`tode add:service <SERVICE_NAME>`](#tode-addservice-service_name)
* [`tode create-project <PROJECT_NAME`](#tode-create-project-project-name)
* [`tode help [COMMAND]`](#tode-help-command)

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

_See code: [src/commands/add/controller.ts](https://github.com/tode/tode/blob/v0.0.0/src/commands/add/controller.ts)_

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

_See code: [src/commands/add/model.ts](https://github.com/tode/tode/blob/v0.0.0/src/commands/add/model.ts)_

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

_See code: [src/commands/add/resource.ts](https://github.com/tode/tode/blob/v0.0.0/src/commands/add/resource.ts)_

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

_See code: [src/commands/add/service.ts](https://github.com/tode/tode/blob/v0.0.0/src/commands/add/service.ts)_

## `tode create-project PROJECT NAME`

Scaffolds a fresh Tode project

```
USAGE
  $ tode create-project PROJECT NAME

ARGUMENTS
  PROJECT NAME  Name of project to create

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  tode create-project myNewProject
```

_See code: [src/commands/create-project/index.ts](https://github.com/tode/tode/blob/v0.0.0/src/commands/create-project/index.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->

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