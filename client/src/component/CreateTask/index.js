import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addTask } from "../../api/taskApi";
import LoadingSpinner from "../loadingSpinner";
import './CreateTask.css';

const CreateTask = () => {

 const queryClient = useQueryClient();
 
 const mutation = useMutation(addTask,{
  onSuccess:()=>{
  queryClient.invalidateQueries('tasks')
  
  }
 });
 
 const handleSubmit = (e)=>{
  e.preventDefault();
  if (!inputValue.title.trim()) {
    return;
  }
  // Get the form element from the event
  const form = e.currentTarget;

  // Create FormData from the form element
  const formData = new FormData(form);
  // ToDo -User id
  const user_id = localStorage.getItem('user_id');
  const formDataObj = Object.fromEntries(formData.entries())
  formDataObj.user_id = user_id;
 mutation.mutate(formDataObj)
 setInputValue(initialState)
}

  
  const initialState = {
    title: "",
    description: "",
  };

  const [inputValue, setInputValue] = useState( JSON.parse(localStorage.getItem("localInput")) || initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  if (name === 'title' && e.key === 'Enter' && !value.trim()) {
    e.preventDefault();
    return;
  }
    setInputValue((p) => ({ ...p, [name]: value }));
  };

  useEffect(() => {
    localStorage.setItem("localInput", JSON.stringify(inputValue));
  }, [inputValue]);
  if(mutation.isLoading) <LoadingSpinner />
  return (
    <form className="task-component" onSubmit={handleSubmit}>
      <div className="title-group">
        <input
          type="text"
          name="title"
          className={`input-field ${inputValue.title ? "triggered" : ""}`}
          placeholder="Things to do"
          value={inputValue.title}
          onChange={(e) => handleInputChange(e)}
          autoComplete="off"
        />
        <button
        type="button"
          className={`btn-clear ${inputValue.title ? "" : "hidden"}`}
          onClick={() => {
            setInputValue(initialState);
          }}
        >
          X
        </button>
      </div>
      {inputValue.title && (
        <div className="text-area-group">
          <textarea
            name="description"
            value={inputValue.description}
            className="text-area"
            placeholder="Tell about your task"
            onChange={(e) => handleInputChange(e)}
          />
          <button
          type="submit"
            className={`btn-add ${inputValue ? "" : "hidden"}`}
          >
            Add
          </button>
        </div>
      )}
    </form>
  );
};

export default CreateTask;
