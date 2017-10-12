"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const connectionUrl = process.env.DB_CONNECTION;
if (!connectionUrl) {
    throw new Error('Database URL not specified');
}
let mongo;
mongodb_1.MongoClient.connect(connectionUrl)
    .then(db => {
    console.log('connected to mongo instance');
    mongo = db;
}).catch(reason => {
    console.log(`Error authenticating on database: ${reason}`);
});
function closeMongo() {
    if (mongo) {
        console.log('Closing mongo db');
        mongo.close()
            .then(() => process.exit(2))
            .catch(() => process.exit(2));
        mongo = null;
    }
    else {
        process.exit(2);
    }
}
process.on('exit', function () {
    closeMongo();
});
process.on('SIGINT', function () {
    closeMongo();
});
class Database {
    findAllSections() {
        return mongo.collection('sections')
            .find({})
            .map((section) => {
            return {
                id: section._id,
                sortOrder: section.sortOrder,
                title: section.title,
                image: section.image,
                snippetText: section.snippetText
            };
        }).toArray();
    }
}
exports.Database = Database;
