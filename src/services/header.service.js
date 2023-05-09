const accessToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accountToken && user.accountToken.accessToken)  {
    return {
      Authorization: `Bearer ${user.accountToken.accessToken}`      
    } 
  }
  return {

  }
}
const refreshToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accountToken && user.accountToken.refreshToken) {
    return {
      Authorization: `Bearer ${user.accountToken.refreshToken}`
    }
  }
  return {
    
  }
}
const userName = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if(user && user.data && user.data.userName){
    return user.data.userName
  }  
  return ""  
}
export default {
  accessToken,
  refreshToken,
  userName
}
