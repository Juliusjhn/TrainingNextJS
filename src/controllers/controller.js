import {PrismaClient} from "@prisma/client";

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
        this.tableName = props?.tableName ?? undefined
        BigInt.prototype.toJSON = function(){
            return this.toString();
        }
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
}