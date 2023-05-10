import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import AuthController from "@app/src/controllers/auth.controller";
import moment from "moment";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id:'my-credentials',
            name:'my-credentias',
            credentials:{
                email:{
                    label: "email",
                    type:"email",
                    placeholder: 'please input your email'
                },
                password: {
                    label:"password",
                    type:"password"
                }
            },
            async authorize(credentials,req){

                const [
                    err ,
                    data
                ] = await new AuthController({
                    fields: credentials
                }).signIn();


                if(err) return false;
                if(!data) return false;

                //function example generate token
                // const token = generateToken(data);
                const token = "KNJKFSJNKjasdkjas"
                Reflect.set(data,'token',token)

                return {
                    error:false,
                    ...data
                }
            }
        })
    ],
    secret:process.env.JWT_SECRET,
    jwt: {
        maxAge: 3 * 24 * 60 * 60,
        secret: process.env.JWT_SECRET
    },
    session: {
        maxAge: 3 * 24 * 60 * 60,
        strategy: "jwt"
    },
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        async redirect({url, baseUrl}){
            return baseUrl
        },
        async signIn({account,profile,user}){
            console.log({
                account,
                profile,
                user
            });
            switch(account?.provider){
                case "my-credentials":
                    return true;
                default:
                    return false;
            }
        },
        async jwt({
                      token,
                      user ,
                      profile}){
            let newData = {}
            console.log({
                token,
                user,
                profile
            });

            return {
                ...token,
                user,
                profile
            }
        },
        async session({
            session,
            token,
            user,
      }){
            if(Date.now() > moment(session?.expires)){
                return null;
            }
            return session;
        }
    },
    debug:true
})