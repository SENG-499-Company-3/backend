db = db.getSiblingDB("admin")
db.auth("admin","admin")
db = db.getSiblingDB("schedule_backend")

db.createUser({
    user: "user",
    pwd: "user",
    roles: [
        {
            role: "readWrite",
            db: "schedule_backend"
        }
    ]
});

db.createCollection("courses")
db.createCollection("professors")
db.createCollection("rooms")
