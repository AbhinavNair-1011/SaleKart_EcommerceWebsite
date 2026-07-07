

async function globalErrorHandler(err,req,res,next){

let message=err.message || "something went wrong";
let name=err.name || "error";
let stack= err.stack || {}
let statusCode= err.statusCode || 500 


if(err.name==="SequelizeUniqueConstraintError"){

    const field= Object.keys(err.fields)
    message=`${field} already registered`

}
return res.status(statusCode).json({
    success:false,
    statusCode,
    error:{
        message,
        name,
        stack,
        
    },
    data:null
})

}

module.exports=globalErrorHandler