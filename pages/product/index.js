
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Product(){
    const [loading , setLoading] =
        useState(false);
    const [ params, setParams ] =useState({
        page:1,
        limit:10
    });
    const [ data, setData] = useState([]);

    useEffect(()=> {
        setLoading(true);
        axios.get(
            "http://localhost:3001/api/product"
        )
            .then((response)=> {

                if(
                    response?.data?.data &&
                    Array.isArray(
                        response?.data?.data
                    )
                ){
                    setData([
                        ...response?.data?.data
                    ])
                }

                setLoading(false);
            })
            .catch((err)=> {
                setData([]);
                setLoading(false);
            })
    },[])

    return (
        <div className="w-full" style={{paddingTop:100}}>
            <h1 className={'text-black'}>Product</h1>


            {
                loading ? <p>Loading...</p> :
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