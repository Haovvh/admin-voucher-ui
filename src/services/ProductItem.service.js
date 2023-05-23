import axios from "axios";

import headerService from "./header.service";

const ProductItemAll = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/ProductItem/All`, { 
      headers: headerService.accessToken()
  })
  );
  const ProductItemAvailable = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/ProductItem/Available`, { 
      headers: headerService.accessToken()
  })
  );
  const GetProductItemById = (ProductItemId) => (
    axios.get(`${process.env.REACT_APP_API_URL}/ProductItem/${ProductItemId}`, { 
      headers: headerService.accessToken()
  })
  );
  
  const DeleteProductItemById = (ProductItemId) => (
    axios.delete(`${process.env.REACT_APP_API_URL}/ProductItem/${ProductItemId}`,{
  
    }, { 
      headers: headerService.accessToken()
  })
  );
  
  const DisablePutProductItemById = ( ProductItemId) => (
    axios.put(`${process.env.REACT_APP_API_URL}/ProductItem/Disable/${ProductItemId}`,{
      
    }, { 
      headers: headerService.accessToken()
  })
  );

  const EnablePutProductItemById = (ProductItemId) => (
    axios.put(`${process.env.REACT_APP_API_URL}/ProductItem/Enable/${ProductItemId}`,{
      
    }, { 
      headers: headerService.accessToken()
  })
  );

  const PutProductItemById = (name, description,  isEnable = true, ProductItemId) => (
    axios.put(`${process.env.REACT_APP_API_URL}/ProductItem/${ProductItemId}`,{
      name, description,  isEnable
    }, { 
      headers: headerService.accessToken()
  })
  );

  
  const PostProductItem = (name, description,  isEnable = true) => (
    axios.post(`${process.env.REACT_APP_API_URL}/ProductItem`,{
      name, description,  isEnable
    }, { 
      headers: headerService.accessToken()
  })
  );

  export default {
    PostProductItem,
    ProductItemAll,
    ProductItemAvailable,
    GetProductItemById,
    PutProductItemById,
    DisablePutProductItemById,
    EnablePutProductItemById,
    DeleteProductItemById
  }