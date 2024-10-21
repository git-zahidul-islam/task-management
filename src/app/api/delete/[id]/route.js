import { connectDB } from "@/database/connectDB";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) { // Named export for DELETE
  const { id } = params;
  console.log("backend", id);

  try {
    const db = await connectDB();
    const taskCollection = db.collection('taskCollection');

    // Delete the task from the database using the MongoDB `ObjectId`
    const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
    return new Response(JSON.stringify({ success: false, message: 'Task not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
    });
    }

    return new Response(JSON.stringify({ success: true, message: 'Task deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error deleting task:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
