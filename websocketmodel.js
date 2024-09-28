import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    message: {type:Object},
    sentbyme:{type:Object},
    sendedid:{type:String},
    timestamp: { type: Date, default: Date.now }
  });
  
  const Message1 = mongoose.model('Message1', messageSchema);
  export default Message1;


  
