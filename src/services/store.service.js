import axios from "axios";
import headerService from "./header.service";


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
 
  StoreAll,
  StoreApproveStoreId,
  StoreApproved,
  StoreNeedApproval,
  StoreRejecteStoreId,
  StoreRejected
}
