use experimental_database;

db.createCollection("nato", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "Nato",
            "properties": {
                "_id": {
                    "bsonType": "objectId",
                    "title": "_id"
                },
                "echo": {
                    "bsonType": "string",
                    "title": "echo"
                },
                "foxtrot": {
                    "bsonType": "bool",
                    "title": "foxtrot"
                },
                "golf": {
                    "bsonType": "array",
                    "title": "golf",
                    "additionalItems": true,
                    "items": {
                        "bsonType": "string"
                    }
                },
                "hotel": {
                    "bsonType": "date",
                    "title": "hotel"
                }
            },
            "additionalProperties": false
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});

db.nato.createIndex({
    "": 1
},
{
    "name": "nato_echo_idx",
    "background": true
});

db.nato.createIndex({
    "": 1
},
{
    "name": "nato_golf_uniq_idx",
    "unique": true
});

db.nato.createIndex({
    "": 1
},
{
    "name": "nato_hotel_idx",
    "dropDups": true,
    "background": true
});