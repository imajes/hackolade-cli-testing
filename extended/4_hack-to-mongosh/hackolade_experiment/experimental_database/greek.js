use experimental_database;

db.createCollection("greek", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "Greek",
            "properties": {
                "_id": {
                    "bsonType": "objectId",
                    "title": "_id"
                },
                "alpha": {
                    "bsonType": "string",
                    "title": "alpha"
                },
                "beta": {
                    "bsonType": "bool",
                    "title": "beta"
                },
                "gamma": {
                    "bsonType": "array",
                    "title": "gamma",
                    "additionalItems": true,
                    "items": {
                        "bsonType": "string"
                    }
                },
                "delta": {
                    "bsonType": "date",
                    "title": "delta"
                }
            },
            "additionalProperties": true
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});

db.greek.createIndex({},
{
    "name": "greek_alpha_idx",
    "background": true
});

db.greek.createIndex({},
{
    "name": "greek_gamma_uniq_idx",
    "unique": true
});

db.greek.createIndex({},
{
    "name": "greek_delta_idx",
    "dropDups": true,
    "background": true
});