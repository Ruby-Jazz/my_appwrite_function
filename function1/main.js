import { Client, TablesDB } from 'node-appwrite';

const ENDPOINT = process.env.APPWRITE_FUNCTION_API_ENDPOINT;
const PROJECT_ID = process.env.APPWRITE_FUNCTION_PROJECT_ID;

const TABLE_ID = process.env.TABLE_ID;
const DATABASE_ID = process.env.DATABASE_ID;

export default async ({ req, res, log, error }) => {

    if (!DATABASE_ID || !TABLE_ID) {
        return res.json({
            success: false,
            message: "Missing DATABASE_ID or TABLE_ID in env variables"
        });
    }

    const client = new Client()
        .setEndpoint(ENDPOINT)
        .setProject(PROJECT_ID)
        .setKey(req.headers['x-appwrite-key']);

    const tablesDB = new TablesDB(client);

    try {
        switch (req.method) {

            case "GET": {
                const data = await tablesDB.listRows(
                {tableId:TablesDB, databaseId:DATABASE_ID
                }
                );

                return res.json(data.rows);
            }

            case "POST":
                return res.json({
                    sentData: req.body,
                    RUBYENV: process.env.RUBYENV,
                    MIMAENV: process.env.MIMAENV
                });

            default:
                return res.empty();
        }

    } catch (err) {
        error(err);
        return res.json({
            success: false,
            message: err.message
        });
    }
};