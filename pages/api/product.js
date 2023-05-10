import nc from 'next-connect';
import ErrorHandler from "@app/src/handlers/error.handler";

const handler =
    nc(ErrorHandler);

/**
 * DEFAULT dari next js
 * @param req
 * @param res
 */
function handlers(req,res){
    try{
        if(req.method === 'GET'){

        }
        if(req.method === 'POST'){

        }
        if(req.method === 'DELETE'){

        }
    }catch(err){

    }
}

handler
.post(async (req,res)=> {
    try{
        return res.json({
            ...req.body
        })
    }catch(err){
        res.status(500)
        return res.json({
            error: true,
            status:500,
            message: err?.message
        })
    }
})
.get(async (req,res)=> {
    try{
        return res.json({
            message: "OK"
        })
    }catch(err){
        res.status(500)
        return res.json({
            error: true,
            status:500,
            message: err?.message
        })
    }
})
.delete(async (req,res)=> {
    //logic
})
.put(async (req,res)=> {
    //logic
})

export default handler