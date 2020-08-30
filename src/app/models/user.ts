import {TypeUser} from '../enums/type-user.enum';

export interface User {
    id:number;
    name:string;
    password:string;
    phone:string;
    username:string;
    typeUser:TypeUser;   
}
