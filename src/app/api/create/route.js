import { connectDB } from "@/database/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const createTask = await req.json();        
        const db = await connectDB();
        const taskCollection = db.collection('taskCollection');
        const result = await taskCollection.insertOne(createTask);

        return NextResponse.json({ message: "Task created successfully",data: result});
    } catch (error) {
        // Return an error response
        return NextResponse.json({ message: "There was a problem creating the task!", error: error.message }, { status: 500 });
    }
};
