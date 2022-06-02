**Tode CLI**
====
Tode is a CLI that wraps around the popular express.js. It is a tool that provides a scaffolded approach to building node.js/express.js APIs. The Tode CLI comes packed with features that aims to speed up your development with node/express.js.

[![Version](https://img.shields.io/npm/v/tode-cli.svg)](https://www.npmjs.com/package/tode-cli)
[![Downloads/week](https://img.shields.io/npm/dw/tode-cli.svg)](https://npmjs.org/package/tode-cli)
[![License](https://img.shields.io/npm/l/tode-cli.svg)](https://github.com/taslangraham/tode-cli/blob/main/package.json)

<!-- toc -->
* [Features](#features)
* [Usage](#usage)
* [Commands](#commands)
* [Controllers](#controllers)
* [Routes](#routes)
* [Middleware](#middleware)
* [Database](#database)

# **Features**

* Scaffolds a Node.js/express.js API project
* Ability to generate Controllers
* Ability to generate Models that maps to database tables
* Ability to generate Service files
* Ability to to add JWT based authentication to your app with a single command
* Comes with Knex.js Built in
* Comes with an easy to use ORM, [Objection.js](https://vincit.github.io/objection.js/)
  * Objection.js is built on top of Knex.js to allow easy database operations
* Easy middleware creation and usage
* Easily register controllers to your routes
* 100% Typescript :wink:

# **Usage**

``` bash
npm install -g tode-cli
tode create-project hello-world
```
<!-- usagestop -->
# **Commands**
<!-- commands -->
* [`tode create-project PROJECT NAME`](#tode-create-project-project-name)
* [`tode add:auth`](#tode-addauth)
* [`tode add:controller CONTROLLER_NAME`](#tode-addcontroller-controller_name)
* [`tode add:model MODEL_NAME`](#tode-addmodel-model_name)
* [`tode add:resource RESOURCE_NAME`](#tode-addresource-resource_name)
* [`tode add:service SERVICE_NAME`](#tode-addservice-service_name)
* [`tode help [COMMAND]`](#tode-help-command)

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

adds a complete resource (mode, controller, service)

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

```bash
USAGE
  $ tode add:auth

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ tode aa
```

## `tode help [COMMAND]`

Displays help for menu

```bash
USAGE
  $ tode help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

Read full documentation [here](https://taslangraham.github.io/tode-cli-docs/#/).