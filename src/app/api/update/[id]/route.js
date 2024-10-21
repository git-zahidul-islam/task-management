import { connectDB } from "@/database/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const PUT = async (req, { params }) => {
    const { id } = params; 
    const updatedTask = await req.json();

    console.log("Updating task with ID:", id);
    console.log("Updated task data:", updatedTask);

    try {
        const db = await connectDB();
        const taskCollection = db.collection('taskCollection'); 

        if (!updatedTask || !updatedTask.taskName || !updatedTask.description) {
            return NextResponse.json(
                { message: "Task name and description are required." },
                { status: 400 }
            );
        }

        const result = await taskCollection.updateOne(
            { _id: new ObjectId(id) }, 
            { $set: updatedTask }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { message: "No task found or no changes made." },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Task updated successfully." });
    } catch (error) {
        console.error('Error updating task:', error); 
        return NextResponse.json(
            { message: "There was a problem updating the task!", error: error.message },
            { status: 500 }
        );
    }
};
