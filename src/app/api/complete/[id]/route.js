import { connectDB } from "@/database/connectDB";
import { ObjectId } from "mongodb";

// Named export for the PUT method
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const db = await connectDB();
    const taskCollection = db.collection("taskCollection");

    const result = await taskCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "complete" } }
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Task not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Update successfully", data: result }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error occurred", error: error.message }),
      { status: 500 }
    );
  }
}
