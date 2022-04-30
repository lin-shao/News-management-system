import axios from "axios"
export default function request (config) {
    let axiosInstance = axios.create({
        baseURL:'http://localhost:3000',
        timeout:5000
    })
    axiosInstance.interceptors.request.use(config=>{
        const  token_type="Bearer"
        config.headers.Authorization =token_type+ ' '+window.sessionStorage.getItem('token')
        // 在最后必须返回config
        return config
      })
    return axiosInstance(config);
}