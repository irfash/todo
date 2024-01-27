import axiosInstance from "./axiosInstance";

// http://localhost:8000/api/tasks/1
export const getAlltask = async(userId)=>{
    // console.log(`user_id - > ${userId}`);
    const {data} =await axiosInstance.get(`/api/tasks/${userId}`);
    console.log(data);
    return data;
}


export const addTask = async(newTask)=>{
 const {data} = await axiosInstance.post("/api/tasks",newTask)
 console.log(data);
 return data;
}

// http://localhost:8000/api/tasks/1/updatetask/7
export const updateTask = async(id,user_id,updatedTask)=>{
    console.log(user_id,id);
    const {data} = await axiosInstance.put(`/api/tasks/${user_id}/updatetask/${id}`,updatedTask)
    return data;
}

// http://localhost:8000/api/tasks/1/deletetask/5
export const deleteTask = async(user_id,id)=>{
    console.log(user_id,id);
const {data} = await axiosInstance.delete(`api/tasks/${user_id}/deletetask/${id}`)
return data;
} 