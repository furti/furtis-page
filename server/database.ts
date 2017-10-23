import { MongoClient, Db } from 'mongodb';

const connectionUrl: string = process.env.DB_CONNECTION;

if (!connectionUrl) {
    throw new Error(
        "Database URL not specified. export 'DB_CONNECTION=mongodb://<user>:<password>@127.0.0.1:27017/furti'"
    );
}

let mongo: Db;

MongoClient.connect(connectionUrl)
    .then(db => {
        console.log('connected to mongo instance');

        mongo = db;
    })
    .catch(reason => {
        console.log(`Error authenticating on database: ${reason}`);
    });

function closeMongo() {
    if (mongo) {
        console.log('Closing mongo db');
        mongo
            .close()
            .then(() => process.exit(2))
            .catch(() => process.exit(2));

        mongo = null;
    } else {
        process.exit(2);
    }
}

process.on('exit', function() {
    closeMongo();
});

process.on('SIGINT', function() {
    closeMongo();
});

export class Database {
    findAllSections(): Promise<any> {
        return mongo
            .collection('sections')
            .find({})
            .map((section: any) => {
                const response = {
                    id: section._id,
                    sortOrder: section.sortOrder,
                    title: section.title,
                    image: section.image,
                    snippetText: section.snippetText,
                    authenticationRequired: false
                };

                if (section.requiredRoles && section.requiredRoles.length > 0) {
                    response.authenticationRequired = true;
                }

                return response;
            })
            .toArray();
    }

    getSection(id: number): Promise<any> {
        return mongo
            .collection('sections')
            .findOne({ _id: id })
            .then(section => {
                return section;
            });
    }

    getUser(username: string): Promise<any> {
        return mongo
            .collection('users')
            .findOne({ username })
            .then(user => {
                return user;
            });
    }
}
