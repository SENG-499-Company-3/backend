# Backend

## Running

```
docker compose up --build
```

## testing

after starting the project with docker compose here are some basic
curl commands to try

```
curl http://localhost:3000/SCHEDULE
```


```
curl -H "Content-Type: application/json" -X POST -d '{
      "days": "MTW",
      "inPerson": false,
      "length": 50,
      "name": "ECE 696",
      "requiredFor": ["ECE"]
    }' http://localhost:3000/COURSE
```
