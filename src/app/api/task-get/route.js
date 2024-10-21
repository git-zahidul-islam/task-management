// pages/api/tasks.js
import { connectDB } from "@/database/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const db = await connectDB();
        const taskCollection = db.collection('taskCollection');
        
        const tasks = await taskCollection.find().toArray(); 

        return NextResponse.json({ success: true, data: tasks });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error fetching tasks", error });
    }
};
