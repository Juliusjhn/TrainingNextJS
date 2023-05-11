import nc from 'next-connect';
import ErrorHandler from "@app/src/handlers/error.handler";
import axios from "axios";
import {ProductValidator} from "@app/src/validator/product.validator";
import ProductController from "@app/src/controllers/product.controller";

const handler =
    nc(ErrorHandler);
/**
 * DEFAULT dari next js
 * @param req
 * @param res
 */
// function handlers(req,res){
//     try{
//         if(req.method === 'GET'){
//
//         }
//         if(req.method === 'POST'){
//
//         }
//         if(req.method === 'DELETE'){
//
//         }
//     }catch(err){
//
//     }
// }

handler
    .post(
        ProductValidator.create,
        async (req,res)=> {
            try{

                const [ err, data ] = await new ProductController({
                    fields: req.body?.product
                })._create()

                if(err){
                    res.status(400)
                    return res.json({
                        error:true,
                        message: err?.message
                    })
                }

                return res.json({
                    error:false,
                    data: data
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

            const [err, {
                pagination,
                query,
                data
            }
            ] = await new ProductController({req})
                    ._list();

            if(err) {
                res.status(400);
                return res.json({
                    error:true,
                    message: err?.message
                })
            }

            res.status(200)
            return res.json({
                pagination,
                query,
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


    .delete(async (req,res)=> {
        //logic
    })
    .put(async (req,res)=> {
        //logic
    })

export default handler