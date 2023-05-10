import Joi from 'joi';
import validator from './default.validator'

const create =
    validator({
        body: Joi.object({
            product: Joi.object({
                name: Joi.string().required(),
                description: Joi.string()
                    .min(10)
                    .max(250),
                price: Joi.number().required()
            }).required()
        })
    })

const ProductValidator = {
    create
}

export { ProductValidator }