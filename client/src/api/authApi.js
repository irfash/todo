import axiosInstance from "./axiosInstance";

export const signupUser = async(signupdata)=>{
    const {data} = await axiosInstance.post('/api/auth/signup',signupdata);
    return data;
}

export const LoginUser = async(loginUser)=>{
    try {
        const {data} =await axiosInstance.post('/api/auth/login',loginUser);
        return data;

    }
   
catch (error) {
    console.log("->");
    console.log(error);
}
}