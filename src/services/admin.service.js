import axios from "axios";

const Login = (userName, password) => (
    axios.post(`${process.env.REACT_APP_API_URL}/Admin/Login`, {
        userName,
        password
      })
);
const Logout = () => (
  localStorage.removeItem("user")
);

const refreshToken = (token) => (
   axios.post(`${process.env.REACT_APP_API_URL}/Admin/RefreshToken`, {
    token
  })
)

const changePassword = (oldPassword, newPassword) =>(
   axios.put(`${process.env.REACT_APP_API_URL}/Admin/ChangePassword`, {
    oldPassword, newPassword
  })
)

const GetUser = () => (
   JSON.parse(localStorage.getItem('user'))
)

export default  {
  Login, 
  Logout, 
  refreshToken, 
  GetUser,
  changePassword
}
