export default class AuthController {
    constructor(props) {
        this.fields = props?.fields ?? undefined
    }

    async signIn(){
        try{
            if(!this.fields) {
                return [
                    new Error("this.fields must be defined"),
                    null
                ]
            }
            // call database
            const user = {
                id:1,
                username:"johndoe",
                isBanned:true,
                email: "johndoe@gmail.com",
                avatar: null
            }

            return [ null, user ];
        }catch(err){
            return [ err, null ];
        }
    }

}