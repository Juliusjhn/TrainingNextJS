export default class Helpers{

    /**
     *
     * @param {Object} query
     * @param {(Number|String)} query.page
     * @param {(Number|String)} query.limit
     * @returns {{pagination: {limit: number, page: number}, prisma: {take: number, skip: number}}}
     * @constructor
     */
    static Pagination(query){
        let initialObject = {
            pagination: {
                page:0,
                limit:10
            },
            prisma: {
                skip:0,
                take: 10
            }
        }
        try{

            if(
                'page' in query &&
                query?.page !== null &&
                query?.page !== ''){
                Reflect.set(
                    initialObject.pagination,
                    'page',
                    Number(query?.page)
                    )
            }

            if(
                'limit' in query &&
                query?.limit !== null &&
                query?.limit !== ''
            ){
                Reflect.set(
                    initialObject.pagination,
                    'limit',
                    Number(query?.limit)
                )
                Reflect.set(
                    initialObject.prisma,
                    'take',
                    Number(query?.limit)
                )
            }

            let { page, limit } = initialObject.pagination
            Reflect.set(
                initialObject.prisma,
                'skip',
                limit * ( page > 0 ? page - 1 : 0)
            )
            return {...initialObject}
        }catch(err){
            return {...initialObject}
        }
    }
}