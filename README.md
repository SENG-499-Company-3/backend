# Backend

## Build

- `make build-api`: builds all backend and API containers.
- `make build-db`: builds all db containers.

## Run

- `make run-api`: runs all backend and API containers.

## Logs

- `make log-api`: runs docker logs <container> -f for the API container.
- `make log-db`: runs docker logs <container> -f for the DB container.

## Close and Clean

- `make close`: closes all project containers.
- `make clean`: closes and cleans (removes) all project containers.

## testing

after starting the project with docker compose here are some basic
curl commands to try

```
curl http://localhost:3001/SCHEDULE
```

```
curl -H "Content-Type: application/json" -X POST -d '{
      "days": "MTW",
      "inPerson": false,
      "length": 50,
      "name": "ECE 696",
      "requiredFor": ["ECE"]
    }' http://localhost:3001/COURSE
```
