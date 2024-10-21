"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/features/taskSlice";  // Import fetchTasks thunk
import Skeleton from "@/components/skeleton/Skeleton";
import dynamic from "next/dynamic";

const Card = dynamic(() => import('@/components/card/Card'), {
  loading: () => <Skeleton />,
  ssr: false,
});

export default function AllTask() {
  const dispatch = useDispatch();
  
  // Use selectors to get state from Redux store
  const { tasks, loading, error } = useSelector((state) => state.task);

  // Fetch tasks when the component mounts
  useEffect(() => {
    dispatch(fetchTasks());  // Dispatch fetchTasks thunk
  }, [dispatch]);

  const handleDelete = (taskId) => {
    console.log(`Deleting task with id: ${taskId}`);
    // Add your delete logic here
  };

  // Handle loading and error states
  if (loading) return <Skeleton/>
  if (error) return <p>Error: {error}</p>;

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
        />
      ))}
    </div>
  );
}
