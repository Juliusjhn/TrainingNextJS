import {useState, useEffect} from 'react';
import axios from "axios";

export default function CSR(){

    const [
        data,
        setData
    ] = useState([]);
    const [
        loading,
        setLoading
    ] = useState(true);
    const [
        params,
        setParams
    ] =
        useState({
        page:1,
        limit: 10
    });

    const [params2, setParams2] = useState({
        id:1,
        orderBy:"id"
    })

    let timeout
    useEffect(()=> {
        setLoading(true);
        setData([])
        axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
                params: {
                    ...params,
                    ...params2
                }
            }
        )
            .then((response)=> {
                setData([...response.data]);
                setLoading(false);
            })
            .catch((err)=> {
                setData([]);
                setLoading(false);
            })
    },[params]);

    return (
        <div className="w-full">
            <h1>Client Side Rendering</h1>
            <button onClick={()=>
                setParams({
                    ...params,
                    page:params.page + 1
                })
            }>change page</button>
            <div className="space-y-6 block">
                {
                    loading === true ? "LOADING" : "SELESAI"
                }
                <pre>
                    {
                        JSON.stringify(
                            data,
                            null,
                            2
                        )
                    }
                </pre>
            </div>
        </div>
    )
}