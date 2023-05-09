import axios from "axios";

export default function Multi(props){
    let {
        data = {}, id
    } = props
    return(
        <div>
            <h1>Product Detail - {id}</h1>
            <div className={'width-100 '}>
                <pre>{
                    data !== null &&
                    typeof(data) !== 'undefined' &&
                    typeof(data) === 'object' &&
                    // Object?.keys(data).length > 0 &&
                    Object
                        .entrfies(data)
                        .map(
                            ([key,value])=> {
                                return <div>
                                    <span>{key}</span>
                                    <span> - </span>
                                    <span>{value}</span>
                                </div>
                            })
                }</pre>
            </div>
        </div>
    )
}

export async function getStaticPaths(){
    let paths = [];


    await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
    )
        .then((response)=> {
            paths = response.data
        })

    if(Array.isArray(paths) && paths.length > 0){
        paths = paths.map((item)=> ({
            params: { id : `${item?.id ?? null}`}
        }))
    }

    return {
        paths: paths ?? [],
        fallback: false
    }
}
export async function getStaticProps(context){

    let { id } = context.params;
    let data = null;

    await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    )
        .then((response)=> {
            if(
                typeof(response?.data) !== 'undefined' &&
                typeof(response?.data) === "object" &&
                Object.keys(response?.data).length > 0
            ){
                data = response?.data
            }
        })

    return {
        props: {
            data: data,
            id: id
        }
    }
}
