# katana-task

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Requirements

* <a href="https://nodejs.org/en/">Node</a>
* <a href="https://yarnpkg.com/">Yarn</a>
* <a href="https://www.docker.com/">Docker</a>
* <a href="https://docs.docker.com/compose/install/">Docker-Compose</a>

## Running inside Docker-Compose

Docker-Compose runs both application and database. Database gets seeded automatically.

### Run the application

```sh
docker-compose up -d
```

Open http://localhost:1337/explorer in your browser.

## Local development
### Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
yarn install
```

### Configure .env

Use local DB connection details inside .env

### Run the application

```sh
yarn start
```

Open http://localhost:3000/explorer in your browser.

## Tests

```sh
yarn test
```


## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
