
import {Client,Databases} from 'node-appwrite'
const PROJECT_ID = process.env.PROJECT_ID;
const TABLE_ID = process.env.TABLE_ID;
const DATABASE_ID =process.env.DATABASE_ID;
export default async ({req,res,log,error})=>{

    const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);
    
  const databases = new Databases(client);
try {
    
switch(req.method) {
        case "GET": {
const res = await databases.listRows({
  TABLE_ID,DATABASE_ID,
  
}
)
res.json(res.rows)
        }
           
        
        case "POST": 
            return res.json({
                sentData : req.body, 
                RUBYENV : process.env.RUBYENV,
                MIMAENV:process.env.MIMAENV
            })
        
        default : return res.empty();
    }
} catch (err) {
    error(err)
    res.json({
        success: "false",
        message: error.message,
    })
    
}
    
}