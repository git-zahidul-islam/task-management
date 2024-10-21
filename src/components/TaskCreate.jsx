"use client"
import React from "react";
import { useForm } from "react-hook-form";

const TaskCreate = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Add logic to handle form submission, such as sending the data to an API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-md shadow-md">
      {/* Task Name */}
      <div className="col-span-2">
        <label className="block text-gray-700">Task Name</label>
        <input
          type="text"
          {...register("taskName", { required: "Task name is required" })}
          className={`mt-1 block w-full p-2 border ${errors.taskName ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          placeholder="Enter task name"
        />
        {errors.taskName && <p className="text-red-500 text-sm">{errors.taskName.message}</p>}
      </div>

      {/* Description */}
      <div className="col-span-2">
        <label className="block text-gray-700">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className={`mt-1 block w-full p-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          placeholder="Enter task description"
          rows="4"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-gray-700">Due Date</label>
        <input
          type="date"
          {...register("dueDate", { required: "Due date is required" })}
          className={`mt-1 block w-full p-2 border ${errors.dueDate ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
      </div>

      {/* Priority Level */}
      <div>
        <label className="block text-gray-700">Priority Level</label>
        <select
          {...register("priority", { required: "Priority level is required" })}
          className={`mt-1 block w-full p-2 border ${errors.priority ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
      </div>

      {/* Category Tags */}
      <div>
        <label className="block text-gray-700">Category</label>
        <select
          {...register("category", { required: "Category is required" })}
          className={`mt-1 block w-full p-2 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      {/* Custom Tag */}
      <div>
        <label className="block text-gray-700">Custom Tag</label>
        <input
          type="text"
          {...register("customTag", { required: "Custom tag is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter custom tag"
        />
        {errors.customTag && <p className="text-red-500 text-sm">{errors.customTag.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="col-span-2">
        <button
          type="submit"
          className="mt-4 w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create Task
        </button>
      </div>
    </form>
  );
};

export default React.memo(TaskCreate);
