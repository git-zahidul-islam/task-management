"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, completeTask } from "@/features/taskSlice";
import Skeleton from "@/components/skeleton/Skeleton";
import dynamic from "next/dynamic";
import EditTaskDialog from "@/components/editTaskDialog/EditTaskDialog";

const Card = dynamic(() => import('@/components/card/Card'), {
  loading: () => <Skeleton />,
  ssr: false,
});

export default function AllTask() {
  const dispatch = useDispatch();
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null); // Track pending task deletion
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false); 
    setSelectedTask(null);
  };

  const handleDelete = (taskId) => {
    setPendingDelete(taskId); // Set task for pending deletion

    // Set timeout for task deletion
    const deleteTimeout = setTimeout(() => {
      dispatch(deleteTask(taskId));
      setPendingDelete(null); // Clear pending delete state
    }, 5000);

    // Attach the timeout ID to be able to clear it if "Undo" is clicked
    setPendingDelete({ taskId, deleteTimeout });
  };

  const handleUndo = () => {
    if (pendingDelete) {
      clearTimeout(pendingDelete.deleteTimeout); // Cancel the deletion
      setPendingDelete(null); // Clear the pending delete state
    }
  };

  const handleComplete = (id) => {
    console.log(id);
    dispatch(completeTask(id))
  }

  return (
    <div className="space-y-4 w-[50%] mx-auto">
      <p>{tasks.length} tasks found</p>
      {tasks.map((task) => (
        <Card
          key={task._id}
          id={task._id}
          taskName={task.taskName}
          description={task.description}
          dueDate={task.dueDate}
          priority={task.priority}
          handleComplete={()=> handleComplete(task._id)}
          handleDelete={() => handleDelete(task._id)} 
          handleEdit={() => handleEditClick(task)}
        />
      ))}

      {isOpen && (
        <EditTaskDialog task={selectedTask} onClose={handleDialogClose} />
      )}

      {/* Show "Undo" Snackbar when a task is pending deletion */}
      {pendingDelete && (
        <div className="fixed bottom-10 right-10 flex flex-col items-center justify-center p-4 bg-gray-800 text-white rounded shadow">
          <p>Task will be deleted in 5 seconds</p>
          <button 
            onClick={handleUndo} 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}
