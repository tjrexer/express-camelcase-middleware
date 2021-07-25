# Express Camelcase Middleware

Used to convert api requests to/from camelcase/snakecase depending on your requirements.

There are 2 middlewares with this package.  

### snakeCaseHandler
snakeCaseHandler will handle conversions to and from snake_case where camelCase is used internally in an app, with snake_case being supported by the API.  The handler accepts all options from [snakecase-keys](https://www.npmjs.com/package/snakecase-keys).

### camelCaseHandler
camelCaseHandler will handle conversions to and from camelCase where snake_case is used internally in an app, with camelCase being supported by the API. The handler accepts all options from [camelcase-keys](https://www.npmjs.com/package/camelcase-keys).

## Installing
```
npm i express-camelcase-middleware
```

## Usage
You must import the middleware, and then add it to your express app as shown below.  It is required to also include `express.json()` as well as `express.urlencode({extended:true})` since these are used by express to handle conversions of the requests.

### camelCaseHandler
Recommended options used are `{deep: true}`

```
import { camelCaseHandler } from express-camelcase-middleware

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(camelCaseHandler(options))
```

### snakeCaseHandler
Recommended options used are `{deep: true}`

```
import { snakeCaseHandler } from express-camelcase-middleware

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(snakeCaseHandler(options))
```

## Built With
- [Express](http://expressjs.com) - Web Framework
- [Jest](https://jestjs.io/) - Testing Framework
- [snakecase-keys](https://www.npmjs.com/package/snakecase-keys) - Snake Case conversion
- [camelcase-keys](https://www.npmjs.com/package/camelcase-keys) - Camel Case conversion
