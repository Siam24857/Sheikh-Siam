import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/lib/models/Message";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    await dbConnect();

    // If sessionId is provided, fetch messages for that user
    if (!sessionId) {
      // Admin view: fetch all messages for processing
      const messages = await Message.find().sort({ timestamp: 1 });
      return NextResponse.json(messages);
    }

    const messages = await Message.find({ sessionId }).sort({
      timestamp: 1,
    });
    return NextResponse.json(messages);
  } catch (error: any) {
    console.error("GET Chat Messages Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { senderName, sessionId, content, isAdmin, senderEmail } = body;

    if (!senderName || !sessionId || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await dbConnect();

    const newMessage = await Message.create({
      senderName,
      sessionId,
      senderEmail: senderEmail || "",
      content,
      isAdmin: isAdmin || false,
    });

    return NextResponse.json(newMessage);
  } catch (error: any) {
    console.error("POST Chat Messages Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
