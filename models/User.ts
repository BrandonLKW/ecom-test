export class User {
    user_id: string = "0";
    name: string = "";
    email: string = "";
    password: string = "";
    address: string = "";
    account_type: string = "";

    constructor(user_id?: string, name?: string, email?:string, password?:string, address?:string, account_type?:string){
        if (user_id){
            this.user_id = user_id;
        }
        if (name){
            this.name = name;
        }
        if (email){
            this.email = email;
        }
        if (password){
            this.password = password;
        }
        if (address){
            this.address = address;
        }
        if (account_type){
            this.account_type = account_type;
        }
    }
}