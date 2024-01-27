import React from "react";
import Header from "../../component/Header";
import CreateTask from "../../component/CreateTask";
import Task from "../../component/task";
import { useQuery } from "react-query";
import { getAlltask } from "../../api/taskApi";
import LoadingSpinner from "../../component/loadingSpinner";
const Home = () => {
    const {data,error,isLoading} = useQuery(['tasks'],()=>getAlltask(localStorage.getItem('user_id')));
    const name = localStorage.getItem('name') || "who are u (`-`)";
  if(error){
    return <div>error</div>}
  if(isLoading)return <LoadingSpinner />
  return (
    <>
      <Header user={name}/>
      <CreateTask />
      {
        data.map((taskData)=>{
         return <Task key={taskData.id} task={taskData}/>
        })
      }
    </>
  );
};

export default Home;
