import React from "react";

const Card = ({taskName,description,dueDate,priority,handleDelete}) => {
    return (
        <div className="flex border rounded-lg shadow-md p-4 bg-white">
            {/* Left Side */}
            <div className="flex-1 pr-4">
                <h3 className="text-xl font-semibold">{taskName}</h3>
                <p className="text-gray-700">{description}</p>
            </div>

            {/* Right Side */}
            <div className="flex flex-col w-[35%]">
                {/* Right Side Top */}
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-gray-600">Due Date: {dueDate}</p>
                    <p className={`font-medium ${priority === 'high' ? 'text-red-500' : priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)} 
                    </p>
                </div>

                {/* Right Side Bottom */}
                <div className="flex justify-between">
                    <button
                        
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
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
                       
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                        Bookmark
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
