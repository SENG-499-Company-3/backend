# Backend

Build
- `make build-api`: builds all backend and API containers.
- `make build-db`: builds all db containers.

Run
- `make run-api`: runs all backend and API containers.

Logs
- `make log-api`: runs docker logs <container> -f for the API container.
- `make log-db`: runs docker logs <container> -f for the DB container.

Close and Clean
- `make close`: closes all project containers.
- `make clean`: closes and cleans (removes) all project containers.
