import nc from 'next-connect';
import ErrorHandler from "@app/src/handlers/error.handler";
import axios from "axios";
import {ProductValidator} from "@app/src/validator/product.validator";
import ProductController from "@app/src/controllers/product.controller";

const handler =
    nc(ErrorHandler);

handler
    .get(async (req,res)=> {
        try{
            let { id } = req.query

            const [ err , data ] = await new ProductController({
                key: req.query?.orderBy ?? "id",
                value: id
            })._detail()

            if(err) {
                res.status(400)
                return res.json({
                    error:true,
                    status:400,
                    message: err?.message
                })
            }

            if(!data){
                res.status(404)
                return res.json({
                    error:true,
                    status:404,
                    message: "Product Not Found"
                })
            }

            res.status(200);
            return res.json({
                error:false,
                status:200,
                message: "OK",
                data
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

export default handler