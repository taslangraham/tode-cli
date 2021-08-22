**tode**
====



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/tode.svg)](https://npmjs.org/package/tode-cli)
[![Downloads/week](https://img.shields.io/npm/dw/tode.svg)](https://npmjs.org/package/tode)
[![License](https://img.shields.io/npm/l/tode.svg)](https://github.com/tode/tode/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# **Usage**
<!-- usage -->
To run locally

``` bash
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
