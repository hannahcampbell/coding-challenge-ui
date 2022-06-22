# schedulicity-chat Sample App

This project contains a fully functional chat backend with the following major elements:
- postgreSQL DB
- .NET 6 WebApi (REST) with Entity Framework for an ORM
- Angular front end - empty project

### Prerequisites
- [git](https://git-scm.com/)
- [docker](https://docs.docker.com/get-docker/)

### Running the cluster

```shell
docker-compose up
```

The first run will build the containers, run required data migrations, and stand up the servers.

NOTE: There may be a delay until the migrations run, as there is a healthcheck waiting on the DB to be ready.

The API should be available at `http://localhost:5000`

The Swagger UI should be available at `http://localhost:5000/swagger`

The UI should be available at `http://localhost:8100`

### Stopping the cluster
```shell
docker-compose down -v
```
Note: the `-v` is important because of the named volumes.
