import { MongoClient, Db, Cursor } from 'mongodb';

export class Furti {
    private password: string;
    private username: string;
    private db: Db;

    constructor(username: string, password: string) {
        this.username = encodeURIComponent(username);
        this.password = encodeURIComponent(password);
    }

    connect(): Promise<Furti> {
        return new Promise((resolve, reject) => {
            const uri = `mongodb://${this.username}:${this.password}@127.0.0.1:27017/furti`;

            MongoClient.connect(uri)
                .then(db => {
                    console.log('connected to mongo instance');
                    this.db = db;

                    resolve(this);
                })
                .catch(reason => {
                    console.log(`Error authenticating on database: ${reason}`);
                    reject(reason);
                });
        });
    }

    updateSection(section: any, options: UpdateOptions): Promise<any> {
        const sectionToUpdate = Object.assign({}, section);
        sectionToUpdate._id = sectionToUpdate.id;
        delete sectionToUpdate.id;

        return this.findSectionById(sectionToUpdate._id)
            .count()
            .then(count => {
                if (count === 0) {
                    console.log('Creating new section');

                    return this.db
                        .collection('sections')
                        .insert(sectionToUpdate)
                        .then(result => {
                            console.log(`Added section`, result);

                            if (options.autoclose) {
                                return this.close();
                            }

                            return result;
                        }) as Promise<any>;
                } else {
                    console.log('Updating existing section');

                    return this.db
                        .collection('sections')
                        .updateOne(
                            {
                                _id: sectionToUpdate._id
                            },
                            {
                                $set: sectionToUpdate
                            }
                        )
                        .then(result => {
                            console.log(`Updated section ${result}`);

                            if (options.autoclose) {
                                return this.close();
                            }

                            return result;
                        }) as Promise<any>;
                }
            })
            .catch((reason: any) => {
                console.error(`Error updating or inserting section ${reason}`);

                if (options.autoclose) {
                    return this.close();
                }
            });
    }

    updateUser(user: any, options: UpdateOptions): Promise<any> {
        const userToUpdate = Object.assign({}, user);
        userToUpdate._id = userToUpdate.id;
        delete userToUpdate.id;

        return this.findUserById(userToUpdate._id)
            .count()
            .then(count => {
                if (count === 0) {
                    console.log('Creating new user');

                    return this.db
                        .collection('users')
                        .insert(userToUpdate)
                        .then(result => {
                            console.log(`Added user`, result);

                            if (options.autoclose) {
                                return this.close();
                            }

                            return result;
                        }) as Promise<any>;
                } else {
                    console.log('Updating existing user');

                    return this.db
                        .collection('users')
                        .updateOne(
                            {
                                _id: userToUpdate._id
                            },
                            {
                                $set: userToUpdate
                            }
                        )
                        .then(result => {
                            console.log(`Updated user ${result}`);

                            if (options.autoclose) {
                                return this.close();
                            }

                            return result;
                        }) as Promise<any>;
                }
            })
            .catch((reason: any) => {
                console.error(`Error updating or inserting user ${reason}`);

                if (options.autoclose) {
                    return this.close();
                }
            });
    }

    updateUserPassword(username: string, password: string, options: UpdateOptions): Promise<any> {
        return this.db
            .collection('users')
            .updateOne(
                { username },
                {
                    $set: { password }
                }
            )
            .then(() => {
                if (options.autoclose) {
                    return this.close();
                }
            });
    }

    findSectionById(id: number): Cursor<any> {
        return this.db.collection('sections').find({ _id: id });
    }

    findUserById(id: string): Cursor<any> {
        return this.db.collection('users').find({ _id: id });
    }

    close(): void {
        this.db
            .close()
            .then(() => {
                console.log('Disconnected from database');
            })
            .catch(reason => {
                console.error(`Error while disconnecting ${reason}`);
            });
    }
}

export interface UpdateOptions {
    autoclose: boolean;
}
