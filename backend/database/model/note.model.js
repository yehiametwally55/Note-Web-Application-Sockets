import mongooose from 'mongoose';

const noteSchema = new mongooose.Schema({
    name: String,
    description:String,
},{
    timestamps:true
})

export const noteModel = mongooose.model("note", noteSchema);