import axios from "axios";
import headerService from "./header.service";

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
  }, { 
    headers: headerService.accessToken()
})
);

const changePassword = (oldPassword, newPassword) =>(
   axios.put(`${process.env.REACT_APP_API_URL}/Admin/ChangePassword`, {
    oldPassword, newPassword
  }, { 
    headers: headerService.accessToken()
})
);

const partnerAll = () => (
  axios.get(`${process.env.REACT_APP_API_URL}/Admin/Partner/All`, { 
    headers: headerService.accessToken() 
  })
);
const endUserAll = () => (
  axios.get(`${process.env.REACT_APP_API_URL}/Admin/EndUser/All`, { 
    headers: headerService.accessToken() 
  })
);

const StoreAll = () => (
  axios.get(`${process.env.REACT_APP_API_URL}/Admin/Store/All`, { 
    headers: headerService.accessToken() 
})
);

const StoreApproved = () => (
  axios.get(`${process.env.REACT_APP_API_URL}/Admin/Store/Approved` , { 
    headers: headerService.accessToken()
})
);

const StoreRejected = () => (
  axios.get(`${process.env.REACT_APP_API_URL}/Admin/Store/Rejected`, { 
    headers: headerService.accessToken() 
})
);

const StoreNeedApproval = () => (
  axios.get(`${process.env.REACT_APP_API_URL}/Admin/Store/NeedApproval`, { 
    headers: headerService.accessToken()
})
);

const StoreApproveStoreId = (storeId) => (
  axios.put(`${process.env.REACT_APP_API_URL}/Admin/Store/Approve/${storeId}`, {

  },{ 
    headers: headerService.accessToken()
})
);

const StoreRejecteStoreId = (storeId) => (
  axios.put(`${process.env.REACT_APP_API_URL}/Admin/Store/Reject/${storeId}`, {
    
  }, { 
    headers: headerService.accessToken()
})
);

export default  {
  Login, 
  Logout, 
  refreshToken,   
  changePassword,
  partnerAll,
  endUserAll,
  StoreAll,
  StoreApproveStoreId,
  StoreApproved,
  StoreNeedApproval,
  StoreRejecteStoreId,
  StoreRejected
}
