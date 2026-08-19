import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
  withCredentials: true,//includes cookies and headers when we send the req 
                        //so backend end can check whether the user is authenticated or not
});
