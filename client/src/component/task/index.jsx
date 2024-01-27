import React, { useCallback, useState } from "react";
import "./Task.css";
import debounce from 'lodash.debounce';
import { useMutation, useQueryClient } from "react-query";
import { deleteTask, updateTask } from "../../api/taskApi";
import DeleteIcon from "../../assert/icons/delete.svg";
import ArrowDown from "../icons/ArrowDown";
import LoadingSpinner from "../loadingSpinner";
import RadioBtn from "../radio-btn";
const Task = ({ task }) => {
const initialTitle = task.title;
const queryClient = useQueryClient();
const updateMutation = useMutation((updatedField)=>updateTask(task.id,task.user_id,updatedField))
const deleteMutation = useMutation(()=>deleteTask(task.user_id,task.id),{
  
  onSuccess:()=>{
    queryClient.invalidateQueries('tasks');
  }
});

const handelDelete = ()=>{
  deleteMutation.mutate();
}

// eslint-disable-next-line react-hooks/exhaustive-deps
const debouncedUpdate = useCallback(debounce(updatedField=>{
  updateMutation.mutate(updatedField);
}),[updateMutation])
  const [taskData,setTaskData] = useState({
    title:task.title,
    description:task.description,
    status:task.status
  })
  
  const [showDescription, setShowDescription] = useState(false);

  const toggleStatus = () => {
    const newStatus = !taskData.status;
    setTaskData((prev)=>({...prev,status:!prev.status}));
    debouncedUpdate({"status":newStatus?1:0})
  };


  const handelChange = (event) =>{
    const {name,value} = event.target;
    setTaskData((prev)=>({...prev,[name]:value}))
    if (name === "title" && !value.trim()) {
      debouncedUpdate({"title":initialTitle})
      return;
    }
    
    debouncedUpdate({[name]:value});
  }
  if(deleteMutation.isLoading )
  return <LoadingSpinner />
if (updateMutation.isError || deleteMutation.isError) {
  return <div>Error occurred: {updateMutation.error.message || deleteMutation.error.message}</div>;
}
 
  return (
    <>
      <div className="todo" >
        <div className="svg-container" onClick={toggleStatus}>
          <RadioBtn status={taskData.status} name="status"/>
        </div>
        <input
          className={`todo-title ${taskData.status ? "completed" : ""}`}
          name="title"
          value={taskData.title}
          onChange={handelChange}
          autoComplete="off"
        />
        <div className="btns">
          <ArrowDown toggle={()=>setShowDescription(!showDescription)}/>
          <img src={DeleteIcon} alt="Delete icon" className="delete-icon" onClick={handelDelete} />
        </div>
      </div>
      {showDescription && (
        <textarea
          placeholder="description...."
          value={taskData.description}
          name="description"
          className={`des ${taskData.status ? "completed" : ""}`}
          onChange={handelChange}
          autoComplete="off"
        />
      )}
    </>
  );
};

export default Task;