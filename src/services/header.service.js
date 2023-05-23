const accessToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  
  if (user && user.data && user.data.token && user.data.token.accessToken)  {
    return {
      Authorization: `Bearer ${user.data.token.accessToken}`      
    } 
  }
  return {

  }
}

const refreshToken = () => {
  
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.data && user.data.token && user.data.token.refreshToken)  {
    return {
      Authorization: `Bearer ${user.data.token.refreshToken}`      
    } 
  }
  return {

  }  
}

const userName = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if(user && user.data && user.data.account.userName){
    return user.data.account.userName
  }  
  return ""  
}

const GetUser = () => (
  JSON.parse(localStorage.getItem('user'))
);

export default {
  accessToken,
  refreshToken,
  GetUser, userName
}
