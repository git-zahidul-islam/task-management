import React from "react";

const Card = ({ taskName, description, dueDate, priority, status, handleDelete, handleEdit, handleComplete }) => {
    return (
        <div className={`flex md:flex-row flex-col border rounded-lg shadow-md p-4 bg-white ${status === 'complete' ? 'bg-gray-200' : ''}`}>
            {/* Left Side */}
            <div className="flex-1 pr-4">
                <h3 className={`text-xl font-semibold ${status === 'complete' ? 'line-through text-gray-500' : ''}`}>
                    {taskName}
                </h3>
                <p className={`text-gray-700 ${status === 'complete' ? 'line-through text-gray-400' : ''}`}>
                    {description}
                </p>
            </div>

            {/* Right Side */}
            <div className="flex flex-col lg:w-[50%] md:w-[50%] w-full">
                {/* Right Side Top */}
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-gray-600">Due Date: {dueDate}</p>
                    <p className={`font-medium ${priority === 'high' ? 'text-red-500' : priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </p>
                </div>

                {/* Right Side Bottom */}
                <div className="flex gap-5">
                    <button
                        onClick={handleEdit}
                        disabled={status === 'complete'}  // Disable button if status is complete
                        className={`px-3 py-1 rounded ${status === 'complete' ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                    <button
                        onClick={handleComplete}
                        disabled={status === 'complete'}  // Disable button if status is complete
                        className={`px-3 py-1 rounded ${status === 'complete' ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}
                    >
                        Complete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
