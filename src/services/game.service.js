import axios from "axios";
import headerService from "./header.service";


const GameAll = () => (
  axios.get(`${process.env.REACT_APP_API_URL}/Game/All`, { 
    headers: headerService.accessToken()
})
);
const GameAvailable = () => (
  axios.get(`${process.env.REACT_APP_API_URL}/Game/Available`, { 
    headers: headerService.accessToken()
})
);
const GetGameById = (gameId) => (
  axios.get(`${process.env.REACT_APP_API_URL}/Game/${gameId}`, { 
    headers: headerService.accessToken()
})
);

const DeleteGameById = (gameId) => (
  axios.delete(`${process.env.REACT_APP_API_URL}/Game/${gameId}`, { 
    headers: headerService.accessToken()
})
);

const PutGameById = (name, description, instruction, gameId, isEnable = true,  imageUrl="/DummyImages/Games/lucky-wheel.jpg") => (
  axios.put(`${process.env.REACT_APP_API_URL}/Game/${gameId}`,{
    name, description, instruction, isEnable, imageUrl
  }, { 
    headers: headerService.accessToken()
})
);
const PostGame = (name, description, instruction, imageUrl="/DummyImages/Games/lucky-wheel.jpg", isEnable = true) => (
  axios.post(`${process.env.REACT_APP_API_URL}/Game/Create`,{
    name, description, instruction, isEnable, imageUrl
  }, { 
    headers: headerService.accessToken()
})
);

export default  {

  GameAll,
  GameAvailable,
  GetGameById,
  PostGame,
  PutGameById,
  DeleteGameById

}
