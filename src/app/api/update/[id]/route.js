import { connectDB } from "@/database/connectDB"; // Ensure this points to your DB connection logic
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId if you're using MongoDB

export const PUT = async (req, { params }) => {
    const { id } = params; // Extract the ID from the request parameters
    const updatedTask = await req.json(); // Parse the incoming JSON

    console.log("Updating task with ID:", id);
    console.log("Updated task data:", updatedTask);

    try {
        const db = await connectDB(); // Connect to the database
        const taskCollection = db.collection('taskCollection'); // Replace with your actual collection name

        // Validate incoming task data
        if (!updatedTask || !updatedTask.taskName || !updatedTask.description) {
            return NextResponse.json(
                { message: "Task name and description are required." },
                { status: 400 } // Bad Request
            );
        }

        // Update the task in the database
        const result = await taskCollection.updateOne(
            { _id: new ObjectId(id) }, // Use ObjectId for MongoDB
            { $set: updatedTask } // Update the task
        );

        // Check if the update was successful
        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { message: "No task found or no changes made." },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Task updated successfully." });
    } catch (error) {
        console.error('Error updating task:', error); // Log any errors
        return NextResponse.json(
            { message: "There was a problem updating the task!", error: error.message },
            { status: 500 } // Internal Server Error
        );
    }
};
