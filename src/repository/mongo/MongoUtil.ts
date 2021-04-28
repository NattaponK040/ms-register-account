import {Collection, Db, MongoClient} from 'mongodb';
import {Application} from 'express';

export class MongoUtil {
    public static createConnection(app: Application, uri: string, dbName: string, authSource = 'admin', poolSize = 5): Promise<Db> {
        return new Promise<Db>((resolve, reject) => {
            MongoClient.connect(uri, {useNewUrlParser: true, authSource, poolSize}, (err, client: MongoClient) => {
                if (err) {
                    reject(err);
                } else {
                    const db: Db = client.db(dbName);
                    app.emit('mongodb.connected');
                    resolve(db);
                }
            });
        });
    }

    public static upsertOne(collection: Collection, query: any) {
        try {
            return collection.findOneAndUpdate(
                query,
                {$set: query, $currentDate: {updateDate: true}},
                {upsert: true},  //upsert to create a new doc if none exists and new to return the new, updated document instead of the old one.
                function (err, doc) {
                    if (err) {
                        console.log("Something wrong when updating data!: ");
                    }
                });
        } catch (err) {
            console.log(err);
        }
    }

    public static async insertOne(collection: Collection, query: any) {
        try {
            return await collection?.insertOne(
                query,
                function (err, doc) {
                    console.log("insert data")
                    if (err) {
                        console.log("Something wrong when insert data!: ");
                    }
                });
        } catch (err) {
            console.log(err);
        }
    }

    // public static find(collection: Collection, query?: any): Promise<string[]> {
    //     try {
    //         return new Promise(function (resolve, reject) {
    //             collection.find(query).toArray().then( (res: any) => {
    //                 resolve(res);
    //             });
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

}