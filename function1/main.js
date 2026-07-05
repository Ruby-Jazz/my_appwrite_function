import { Client, TablesDB } from 'node-appwrite'

// Use Appwrite's built-in, injected system variables
const ENDPOINT = process.env.APPWRITE_FUNCTION_API_ENDPOINT; 
const PROJECT_ID = process.env.APPWRITE_FUNCTION_PROJECT_ID; 

const TABLE_ID = process.env.TABLE_ID;
const DATABASE_ID = process.env.DATABASE_ID;

export default async ({ req, res, log, error }) => {

    const client = new Client()
        .setEndpoint(ENDPOINT) // Fixes the "Project not found" routing issue
        .setProject(PROJECT_ID)
        .setKey(req.headers['x-appwrite-key']);
    
    const tablesDB = new TablesDB(client);
    
    try {
        switch (req.method) {
            case "GET": {
                const data = await tablesDB.listRows({
                    tableId: TABLE_ID,
                    databaseId: DATABASE_ID
                });
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
        // FIX: Added 'return' here to stop execution and solve the missing return warning
        return res.json({
            success: "false",
            message: err.message,
        });
    }
}