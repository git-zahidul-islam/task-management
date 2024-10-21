"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/features/taskSlice";  // Import fetchTasks thunk
import Skeleton from "@/components/skeleton/Skeleton";
import dynamic from "next/dynamic";
import EditTaskDialog from "@/components/editTaskDialog/EditTaskDialog"; // Import your dialog

const Card = dynamic(() => import('@/components/card/Card'), {
  loading: () => <Skeleton />,
  ssr: false,
});

export default function AllTask() {
  const dispatch = useDispatch();
  
  // Use selectors to get state from Redux store
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const tasks = useSelector((state) => state.task.tasks);

  // Fetch tasks when the component mounts
  useEffect(() => {
    dispatch(fetchTasks());  // Dispatch fetchTasks thunk
  }, [dispatch]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the dialog
    setSelectedTask(null); // Reset selected task
  };

  const handleDelete = (taskId) => {
    console.log(`Deleting task with id: ${taskId}`);
    
  };

  // Handle loading and error states
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

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
          handleDelete={() => handleDelete(task._id)}
          handleEdit={() => handleEditClick(task)} // Add edit handler
        />
      ))}
     {isOpen && (
        <EditTaskDialog task={selectedTask} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
