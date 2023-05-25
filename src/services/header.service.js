const accessToken = () => {
  const user = JSON.parse(localStorage.getItem('token'));
  
  
  if (user &&  user.accessToken)  {
    return {
      Authorization: `Bearer ${user.accessToken}`      
    } 
  }
  return {

  }
}

const refreshToken = () => {
  
  const user = JSON.parse(localStorage.getItem('token'));
  if (user && user.refreshToken)  {
    return user.refreshToken
  }
  return ""
}

const userName = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if(user && user.userName){
    return user.userName
  }  
  return ""  
}

const GetUser = () => (
  JSON.parse(localStorage.getItem('user'))
);

export default {
  accessToken,
  refreshToken,
  GetUser, 
  userName
}
