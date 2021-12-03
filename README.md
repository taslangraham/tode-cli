**Tode CLI**
====
CLI tool for scaffolding Node API. Suitable for projects that requires a database.  
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
    * Routes are auto registered when you create a controller (no need for you use ```app.use(<PATH>, <ROUTER-MODULE>)``` anymore )
* Ability to generate Models that maps to database tables
* Ability to generate Service files
* Ability to to add JWT based authentication to your app with a single command
* Comes with Knex.js Built in
* Comes with an easy to use ORM, [Objection.js](https://vincit.github.io/objection.js/)
    * Objection.js is built on top of Knex.js to allow easy database operations
* Self documenting API
* 100% Typescript :wink:

# **Usage**

```
$ npm install -g tode-cli
$ tode create-project hello-world
```
<!-- usagestop -->
# **Commands**
<!-- commands -->
* [`tode create-project PROJECT_NAME`](#tode-create-project-project-name)
* [`tode add:controller CONTROLLER_NAME`](#tode-addcontroller-controller_name)
* [`tode add:model MODEL_NAME`](#tode-addmodel-model_name)
* [`tode add:resource RESOURCE_NAME`](#tode-addresource-resource_name)
* [`tode add:service SERVICE_NAME`](#tode-addservice-service_name)
* [`tode add:auth`](#tode-addauth)
* [`tode help [COMMAND]`](#tode-help-command)

## `tode create-project PROJECT_NAME`

Generates a Tode project

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
Example - ```$ tode add:controller example```  
Generated file :
```javascript
import { Request, Response, Router } from "express";
module.exports = () => {
  const router = Router();
  /**
   * Create a new Item
   */
  router.post("/", async (req, res) => {
    return res.send('example/ - POST');
  });

  /**
   * Get all Items
   */
  router.get("/", (req: Request, res: Response) => {
    res.send("example/  - GET");
  });

  /**
   * Get an Item by Id
   */
  router.get("/:id", (req: Request, res: Response) => {
    res.send("example/  - GET /id");

  });

  /**
   * Update an Item
   */
  router.patch("/:id", (req: Request, res: Response) => {
    res.send("example/  - PATCH /id");

  });

  return router;
};

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

Example - ```$ tode add:model example ```  
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
### Modules generated:  
Controller - ```controllers/auth```  
Model - ```models/user```    
Services - ```services/auth```, ```services/user```  
Middlewares - ```middlewares/auth```,  

### **Execute migration**   
The necessary migration file to create a Users table in the database is also generated. Run the following command to create the Users table.
```bash
knex migrate:latest
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
**Note: The ```pg``` client comes as the default**.  
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

# **Auto Registered Routes**
Route files are refered to as 'controllers' in tode-cli. It is common to have to manually register all your routes like
```javascript
app.use(PATH, ROUTER-MODULE)
```

With tode-cli, you no longer need to do that.The routes in tyour controllers are automatically registered in the app, and can be requested via your client app.

Example - All the paths in the following controller is automatically registered in the app. You can send a GET request from your client to the endpoint ```/example```, this will hit the ```"/"``` handler.

```javascript
import { Request, Response, Router } from "express";
module.exports = () => {
  const router = Router();
  /**
   * Create a new Item
   */
  router.post("/", async (req, res) => {
    return res.send('example/ - POST');
  });

  /**
   * Get all Items
   */
  router.get("/", (req: Request, res: Response) => {
    res.send("example/  - GET");
  });

  /**
   * Get an Item by Id
   */
  router.get("/:id", (req: Request, res: Response) => {
    res.send("example/  - GET /id");

  });

  /**
   * Update an Item
   */
  router.patch("/:id", (req: Request, res: Response) => {
    res.send("example/  - PATCH /id");

  });

  return router;
};
```


