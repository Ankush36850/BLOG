import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    title:{
        type:String
    },
    summary:{
        type : String
    },
    content:{
        type : String
    },
    cover:{
        type : String
    }
},{
    timestamps:true,
});

const PostModel = new mongoose.model('Post', PostSchema);

export default PostModel;