import mongoose, { Schema, model, models } from "mongoose";

export interface IMessage {
  senderName: string;
  senderEmail?: string;
  sessionId: string;
  content: string;
  timestamp: Date;
  isAdmin: boolean;
  isRead: boolean;
}

const MessageSchema = new Schema<IMessage>(
  {
    senderName: { type: String, required: true },
    senderEmail: { type: String, required: false },
    sessionId: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false },
  },
  { collection: "messages" },
);

const Message = models.Message || model<IMessage>("Message", MessageSchema);

export default Message;
