"use client";
import React from "react";
import { useForm } from "react-hook-form";
import './TaskCreate.css'; // Import the CSS file

const TaskCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
        const res = await fetch('http://localhost:3000/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
        }

        const responseData = await res.json(); 
        console.log('Success:', responseData); 
    } catch (error) {
        console.error('Error:', error); 
    }
  };

  return (
    <section className="container">
      <h1 className="title">Task Create Form*</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {/* Task Name */}
        <div className="col-span-2">
          <label className="label">Task Name</label>
          <input
            type="text"
            {...register("taskName", { required: "Task name is required" })}
            className={`input ${errors.taskName ? "error" : ""}`}
            placeholder="Enter task name"
          />
          {errors.taskName && (
            <p className="error-message">{errors.taskName.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="label">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className={`input ${errors.description ? "error" : ""}`}
            placeholder="Enter task description"
            rows="4"
          />
          {errors.description && (
            <p className="error-message">{errors.description.message}</p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <label className="label">Due Date</label>
          <input
            type="date"
            {...register("dueDate", { required: "Due date is required" })}
            className={`input ${errors.dueDate ? "error" : ""}`}
          />
          {errors.dueDate && (
            <p className="error-message">{errors.dueDate.message}</p>
          )}
        </div>

        {/* Priority Level */}
        <div>
          <label className="label">Priority Level</label>
          <select
            {...register("priority", { required: "Priority level is required" })}
            className={`input ${errors.priority ? "error" : ""}`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="error-message">{errors.priority.message}</p>
          )}
        </div>

        {/* Category Tags */}
        <div>
          <label className="label">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className={`input ${errors.category ? "error" : ""}`}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
          </select>
          {errors.category && (
            <p className="error-message">{errors.category.message}</p>
          )}
        </div>

        {/* Custom Tag */}
        <div>
          <label className="label">Custom Tag</label>
          <input
            type="text"
            {...register("customTag", { required: "Custom tag is required" })}
            className={`input ${errors.customTag ? "error" : ""}`}
            placeholder="Enter custom tag"
          />
          {errors.customTag && (
            <p className="error-message">{errors.customTag.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="submit-button"
          >
            Create Task
          </button>
        </div>
      </form>
    </section>
  );
};

export default React.memo(TaskCreate);
