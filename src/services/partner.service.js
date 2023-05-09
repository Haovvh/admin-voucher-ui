import axios from "axios";

const register = ( userName, password, name,  
    gender, birthDate, address , type) =>(

    axios.post(`${process.env.REACT_APP_API_URL}/Partner/Register`,{
        userName, password, name,  gender, birthDate, address , type
    })
);
const registerCompany = (name, businessCode, address, userId) => (
    axios.post(`${process.env.REACT_APP_API_URL}/Partner/RegisterCompany/${userId}`,{
        name, businessCode, address
    })
)

const verifyRegister = (otpValue, userId) =>(
    axios.post(`${process.env.REACT_APP_API_URL}/Partner/VerifyRegister/${userId}`,{
        otpValue
    })
)

const login = (userName, password) => (
     axios.post(`${process.env.REACT_APP_API_URL}/Partner/Login`,{
        userName, password
    })
)

const refreshToken = (token) => (
     axios.post(`${process.env.REACT_APP_API_URL}/Partner/RefreshToken`,{
        token
    })
)


export default {
    register,
    registerCompany,
    verifyRegister,
    login,
    refreshToken
}