import {useState} from 'react';
import {signIn} from "next-auth/react";
export default function Login(){

    const [ formdata, setFormdata] = useState({
        email:"",
        password: ""
    });

    function onChange(e){
        e.preventDefault();
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }
    async function onSubmit(e){
        e.preventDefault();
        await signIn(
            'my-credentials',{
                email:formdata.email,
                password:formdata.password
            }
        ).then((response)=> {
            console.log({
                response
            })
        })
            .catch((err)=>{
                console.log({
                    err
                })
            })
    }
    return (
        <div className="w-full">
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="email"
                    name={'email'}/>
                <input
                    onChange={onChange}
                    type="password"
                    name={'password'}
                />
                <button className={'text-black'} type={'submit'}>Submit</button>
            </form>
        </div>
    )
}