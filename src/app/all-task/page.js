"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/features/taskSlice";
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
  const tasks = useSelector((state) => state.task.tasks);


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); 
    setSelectedTask(null);
  };

  const handleDelete = (taskId) => {
    console.log(`Deleting task with id: ${taskId}`);
    
  };


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
          handleEdit={() => handleEditClick(task)}
        />
      ))}
     {isOpen && (
        <EditTaskDialog task={selectedTask} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
