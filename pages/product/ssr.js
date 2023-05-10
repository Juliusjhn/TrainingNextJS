import axios from "axios";

/**
 * @param {Object} props
 * @param {Object} props.pagination
 * @param {Number} props.pagination.limit
 * @param {Number} props.pagination.skip
 * @param {Number} props.pagination.total
 * @param {Array} props.data
 * @returns {JSX.Element}
 * @constructor
 */
export default function SSR(props){
    let {
        data,
        pagination
    } = props
    return (
        <div className={'text-black'}>

            {/*<pre>*/}
            {/*    {*/}
            {/*        JSON.stringify(*/}
            {/*            props,*/}
            {/*            null,*/}
            {/*            2*/}
            {/*        )*/}
            {/*    }*/}
            {/*</pre>*/}

            {
                Array.isArray(data) &&
                data.length > 0 ?
                    data.map((item)=> {
                        return (
                            <div className={'text-black'} style={{marginBottom:40}}>
                                <p>id :{item.id}</p>
                                <p>title : {item.title} </p>
                                <p>description : {item.description} </p>
                                <p>price : {item.price} </p>

                                <img
                                    src={item.thumbnail} alt={'product image'}
                                    width={300}
                                    height={300}
                                    className={''}
                                />
                            </div>
                        )
                    })
                    : "is empty"
            }
        </div>
    )
}
export async function getServerSideProps(){

    //call api
    const response =
        await axios
            .get(
                "http://localhost:3001/api/product"
            )
            .then((result)=> {
                let data = result.data;
                return {
                    pagination: {
                        limit:data?.limit ?? 10,
                        skip: data?.skip ?? 0,
                        total: data?.total ?? 0
                    },
                    data: data?.data ?? []
                }
            })
            .catch((err)=> {
                return {
                    pagination: {
                        limit: 10,
                        skip: 0,
                        total: 0
                    },
                    data: []
                }
            })

    return {
        props: {
            ...response
        }
    }
}