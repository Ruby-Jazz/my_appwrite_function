export default ({req,res,log,error})=>{
    switch(req.method) {
        case "GET": 
            return res.status(200).text("join me as i create my first appwrite function")
        
        case "POST": 
            return res.status(201).json({
                sentData : req.body,
                RUBYENV : process.env.RUBYENV,
                MIMAENV:process.env.MIMAENV
            })
        
        default : return res.empty();
    }
}