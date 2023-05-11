import {PrismaClient} from "@prisma/client";
import Helpers from "@app/src/helpers";

export default class Controller {

    /**
     * @param props
     */
    constructor(props= {}) {
        this.req = props?.req ?? undefined
        this.res = props?.res ?? undefined
        this.prisma = new PrismaClient();
        this.fields = props?.fields ?? null
        this.key = props?.key ?? undefined
        this.value = props?.value ?? null
        this.where = props?.where ?? {}
        this.tableName = props?.tableName ?? undefined
        BigInt.prototype.toJSON = function(){
            return this.toString();
        }
    }

    async getView(){
        return await this.prisma.$executeRaw(`SELECT VIEW ASDASD`)
    }

    async _create(){
        try{
            if(!this.tableName) return [ new Error('tableName : table name must be defined!'), null]
            if(
                typeof (this.fields) !== "object" &&
                Object.keys(this.fields).length === 0
            ){
                return [
                    new Error('No data found to save'),
                    null
                ]
            }
            const response = await
                this.prisma[this.tableName]
                    .create({
                        data: this.fields
                    })

            return [ null, response ]
        }catch(err){
            return [ err, null ]
        }
    }

    async _detail(){

        try{
            if(!isNaN(Number(this.value))){
                this.value = Number(this.value);
            }

            let condition = {}

            if(Object.keys(this.where).length === 0){
                condition = {
                    where: {
                        [this.key]: this.value
                    }
                }
            }else{
                condition = {
                    where: {
                        ...this.where
                    }
                }
            }

            const response = await this.prisma[this.tableName]
                .findFirst(condition);

            return [ null, response]


        }catch(err){
            return [ err, null]
        }

    }

    async _delete(){
        try{
            if(!isNaN(Number(this.value))){
                this.value = Number(this.value);
            }
            const [ err, data ] = await this._detail();

            if(err) return [new Error(err?.message),null]
            if(!data) return [null, null];

            await this.prisma[this.tableName]
                .delete({
                    where: {
                        [this.key]: this.value
                    }
                })

            return [null, data];
        }catch(err){
            return [ err, null ]
        }
    }

    async _list(){


        console.log({
            query: this.req.query
        })

        const {
            pagination,
            prisma
        } = Helpers.Pagination(this.req.query)

        let result = {
            query: {
                ...this.req?.query
            },
            pagination : {
                page:1,
                limit:10,
                total:0,
                maxPage:0,
            },
            data: []
        }

        let condition = {
            ...prisma,
        }

        try{

            const total = await this.prisma[this.tableName].count();
            const data = await this.prisma[this.tableName].findMany(condition);


            Reflect.set(
                result.pagination,
                'maxPage',
                Math.ceil(total/pagination.limit)
            )

            Reflect.set(result.pagination,'total',total);
            Reflect.set(result,'data',data);

            return [null, {...result}]
        }catch(err){
            return [ err, null]
        }
    }

}