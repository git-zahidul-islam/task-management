"use client"
import Skeleton from "@/components/skeleton/Skeleton";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Card = dynamic(() => import('@/components/card/Card'),{
    loading: () => <Skeleton/>,
    ssr: false,
})

// Function to fetch tasks
export const fetchTask = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/task-get`);
        const data = await res.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data?.data;
    } catch (error) {
        return error.message;
    }
}

export default function AllTask() {
    const [tasks, setTasks] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        const getTasks = async () => {
            try {
                const fetchedTasks = await fetchTask();
                setTasks(fetchedTasks); // Update state with fetched tasks
            } catch (err) {
                setError(err.message);
            }
        };

        getTasks();
    }, []); // Empty dependency array ensures it runs only once on mount

    const handleEdit = (taskId) => {
        // Your edit logic here
        console.log(`Editing task with id: ${taskId}`);
    };

    const handleDelete = (taskId) => {
        // Your delete logic here
        console.log(`Deleting task with id: ${taskId}`);
    };

    const handleBookmark = (taskId) => {
        // Your bookmark logic here
        console.log(`Bookmarking task with id: ${taskId}`);
    };

    // if (loading) return <p>Loading...</p>;
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
                    handleDelete={()=>handleDelete(task._id)}
                    handleEdit={()=>handleEdit(task._id)}
                    handleBookmark={()=>handleBookmark(task._id)}
                />
            ))}
        </div>
    );
}
