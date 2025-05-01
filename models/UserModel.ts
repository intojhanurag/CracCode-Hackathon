import mongoose, { mongo } from "mongoose";
import {Schema,Document} from "mongoose"

export interface IUser extends Document{
    email:string
    name:string
    playlist:mongoose.Types.ObjectId[]
}

const UserSchema=new Schema<IUser>({
    email:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    playlist:[{type:mongoose.Schema.Types.ObjectId,ref:"Playlist"}],
})

export const User=mongoose.models.User||mongoose.model<IUser>("User",UserSchema);