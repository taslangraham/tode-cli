**Tode CLI**
====
Tode is a CLI that wraps around the popular express.js. It is a tool that provides a scaffolded approach to building node.js/express.js APIs. The Tode CLI comes packed with features that aims to speed up your development with node/express.js.

[![Version](https://img.shields.io/npm/v/tode-cli.svg)](https://www.npmjs.com/package/tode-cli)
[![Downloads/week](https://img.shields.io/npm/dw/tode-cli.svg)](https://npmjs.org/package/tode-cli)
[![License](https://img.shields.io/npm/l/tode-cli.svg)](https://github.com/taslangraham/tode-cli/blob/main/package.json)

<!-- toc -->
* [**Features**](#features)
* [**Usage**](#usage)
* [**Commands**](#commands)
* [**Routes**](#routes)
* [**Middleware**](#middleware)
* [**Database**](#database)
<!-- tocstop -->

# **Features**

* Scaffolds a Node.js/express.js API project
* Ability to generate Controllers
* Ability to generate Models that maps to database tables
* Ability to generate Service files
* Ability to to add JWT based authentication to your app with a single command
* Comes with Knex.js Built in
* Comes with an easy to use ORM, [Objection.js](https://vincit.github.io/objection.js/)
  * Objection.js is built on top of Knex.js to allow easy database operations
* Easy middleware creation
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
* [`tode create-project <name>`](#tode-create-project-project_name)
* [`tode add:controller <name>`](#tode-addcontroller-controller_name)
* [`tode add:model <name>`](#tode-addmodel-model_name)
* [`tode add:service <name>`](#tode-addservice-service_name)
* [`tode add:resource <name>`](#tode-addresource-resource_name)
* [`tode add:auth`](#tode-addauth)
* [`tode help [COMMAND]`](#tode-help-command)

## `tode create-project PROJECT_NAME`

Scaffolds a fresh Tode project

``` bash
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

Example - ```$ tode add:controller example```  
Generated file :

```typescript
import { Request, Response } from "../../config/core";

export async function index(request: Request, response: Response) { }

export async function store(request: Request, response: Response) { }

export async function show(request: Request, response: Response) { }

export async function edit(request: Request, response: Response) { }

export async function update(request: Request, response: Response) { }

export async function destroy(request: Request, response: Response) { }
```

Controllers are methods that handles the HTTP request for the routes defined inside the ```
src/routes/index.ts``` file.
Each controller method accepts a request context, ```request```, and a response context, ```response```.

The ```request``` context extends express.js' response context, and adds an ```Auth``` property which provides details of the authenticated user if authentication is active within the application.

The ```response``` context is the regular express.js response context.

The ```Auth``` object holds the following properties:

```typescript
{
    id: string,
    email: string;
    firstName: string;
    lastName: string;
}
```

## `tode add:model MODEL_NAME`

adds a new Databse Model

```bash
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

Example - ```$ tode add:model example```

```javascript
import BaseModel from "../BaseMode";

export class Example extends BaseModel {
  // Table name is the only required property.
  public static tableName = 'example';

  public name!: string;
  // This object defines the relations to other models. The relationMappings
  // property can be a thunk to prevent circular dependencies.
  public static relationMappings = () => ({
    // specify relation with other modules
  })
}
```

Tode uses [Objection.js](https://vincit.github.io/objection.js/) as the ORM. The models created are objection.js models.  
**Note: The ```tableName``` property nust be the name of an actual table in your database**.  
Read more about [**Tode-cli database setup**](#database)

## `tode add:service SERVICE_NAME`

adds a new service  
Service files holds your business logic.

```bash
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

Example - ```$ tode add:service example```  

```javascript
import { ServiceReponse } from "../../config/constants";

class ExampleService {
  private _foo = "foo";

  constructor() {
    //
  }

  get foo() {
    return this._foo;
  }

  set foo(val: string) {
    this._foo = val;
  }

  public foobar() {
    //
  }
}

const exampleService = new ExampleService();

export { exampleService };

```

## `tode add:resource RESOURCE_NAME`

adds a complete resource (model, controller, service). All resources has the same name.

``` bash
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

### Modules generated

Controller - ```controllers/auth```  
Model - ```models/user```
Services - ```services/auth```, ```services/user```  
Middlewares - ```middlewares/auth```

### **Execute migration**

The necessary migration file to create a Users table in the database is also generated. Run the following command to create the Users table.

```bash
knex migrate:latest
```

## `tode help [COMMAND]`

display help for tode

```bash
USAGE
  $ tode help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

# Routes
The users of your website or web application can visit various URLS like ```/articles```, ```/posts```. To make these URLs available you will have to define them as routes.

You define routes inside ```src/routes.ts``` file using the App module(which is instance of of the underlying express app).

A route typically accepts the route pattern as the first argument and route handler as the second argument. For example:

```typescript
import { App, loadController, Response, Request, withMiddleware } from '../config/core';

App.get("/", async (request: Request, response: Response) => {
  return response.status(200).send(`Hello world`);
});
```
The route handler can also reference a controller method via the ```loadController``` method.
```typescript

import { App, loadController, Response, Request, withMiddleware } from '../config/core';

App.get('/example', loadController('example.index'));
```

You can create chainable route handlers for a route path by using ```App.route()```. For example:

```typescript
App.route('/articles')
  .get(async (request: Request, response: Response) => {});
  .post(async (request: Request, response: Response) => {});
  .put(async (request: Request, response: Response) => {});
```

### HTTP methods
You can create routes with commonly used HTTPs. For example:

#### Post

```typescript
App.post('posts', async (request: Request, response: Response) => {})
```

#### Put

```typescript
App.put('posts/:id', async (request: Request, response: Response) => {})
```
#### Patch

```typescript
App.patch('posts/:id', async (request: Request, response: Response) => {})
```

#### Delete

```typescript
App.delete('posts/:id', async (request: Request, response: Response) => {}
```

## Apply middleware to route
You can also pass middleware methods to your routes. Middleware methods will be executed each time a request is sent to the route. For example:

```typescript
App.post('posts', withMiddleware('auth'), async (request: Request, response: Response) => {});
```

You can also pass an array of middlewares to be applied to the route. For example:

```typescript
App.post('posts', withMiddleware(['auth', 'secondMiddleware']), async (request: Request, response: Response) => {});
```
The ```withMiddleware()```method allows you to apply middlewares to a route without having to import the actual middleware method into your route file. Thus, keeping your route file slim.

Middlewares are created in the ```src/middlewares``` folder. Read more about how to create and register middlewares [here](#middleware).

## Create routes using Express.js' ``router`` module
You can also use express.js' ``router`` module to create routes. This is especially useful when you want to group routes or have more modularity. For Example:

First, import the module inside your ``route.ts`` file.
```typescript
import { Router } from '../config/core';
```
Then create your routes:
```typescript
const newsRouter = Router();
newsRouter.get('/', async (request: Request, response: Response)=> {});
App.use('/news', newsRouter);
```
Apply middleware to router
```typescript
const newsRouter = Router();
newsRouter.use(withMiddleware('example'));

newsRouter.get('/', async (request: Request, response: Response)=> {});
App.use('/news', newsRouter);
```
Read more about express.js' routing [here](https://expressjs.com/en/guide/routing.html).

# Middleware
Middleware functions get executed during an HTTP request before it reaches the route handler.

Middleware functions are functions that have access to the request object (``request``), the response object (``response``), and the ``next`` middleware function in the application’s request-response cycle.
The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

## Creating middlewares
You create your middlewares inside designated files in the ```src/middlewares``` folder. Here's an example middleware called 'example':
```typescript
// src/middlewares/example.ts

import { NextFunction } from "express"
import { Request, Response } from '../config/core'

export default class Example{
  public handler(req: Request, res: Response, next: NextFunction) {
    console.log("Example middleware");
    next();
  }
}
```

You the register you middleware inside the ```src/middlewares/index.ts``` file. For example:

First, import your middleware
```typescript
// scr/middlewares/index.ts
import Example from './example';
```
Then register it buy adding it to the ```middleware``` constant.
```typescript
const middleware = {
  // ......,
  example: Example,
}
```
You then use the ```withMiddleware()``` method to use the middleware. For example:

```typescript
App.get('posts', withMiddleware('auth'), async (request: Request,response: Response) => {});
```
**Note:  you apply application level middlewares inside ```initialize()``` method in the```src/app.ts``` file.**

Read more about [express.js middleware](https://expressjs.com/en/guide/using-middleware.html).


# **Database**

## **Objection.js**

Tode leverage's the [Objection.js](https://vincit.github.io/objection.js/) ORM, and Knex.js query builder.  

Objection.js is an ORM for Node.js that aims to stay out of your way and make it as easy as possible to use the full power of SQL and the underlying database engine while still making the common stuff easy and enjoyable.  

Even though ORM is the best commonly known acronym to describe objection, a more accurate description is to call it a relational query builder. You get all the benefits of an SQL query builder but also a powerful set of tools for working with relations.  

Objection.js is built on an SQL query builder called knex. All databases supported by knex are supported by objection.js. SQLite3, Postgres and MySQL are thoroughly tested.  

The underlying databse connection is setup up using Knex.js, and the top level ORM functionalities are done using Objection.js.  

You can read more here to learn how Objection.js works with knex.js.  

## **Knex.js**

Tode uses [knex.js](https://knexjs.org/) to create migrations and seeders. All knex.js commands are available in tode.js.

## **Models**

Tode's models are Objection.js models. [Read more here.](https://vincit.github.io/objection.js/guide/models.html).  

The ``tableName`` property on model holds the name of the table that the model maps to. This property is a requeired property on all models.  
Model relationships  - <https://vincit.github.io/objection.js/guide/relations.html>
Tode uses [knex.js](https://knexjs.org/) to create migrations and seeders. All knex.js commands are available in tode.js.

## **Configuring Database connection**

### **Install one of the following drivers depending on the database you want to use**

```bash
npm install pg
npm install sqlite3
npm install mysql
npm install mysql2
```

**Note: The ```pg``` client comes installed by default**.  

### **Add the following varibales to your `.env` file**

* `IS_DB_ENABLED` # set this to `true`
* `DB_NAME`
* `DB_CLIENT`
* `DB_PORT`
* `DB_PASSWORD`
* `DB_USER`

Behind the scenes tode uses these values to configure a Knex.js connection. You can see the configuration in `src/config/database/db-config.ts`.

Read about the knex.js' config [here](https://knexjs.org/#knexfile). Instead of creating a `knexfile`, tode-cli creates the config object on the fly when setting up the knex.js configuration.
