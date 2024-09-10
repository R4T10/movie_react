import apiClient from "./AxiosClient"
export const login = (user) => {
    console.log(user.username)
    return apiClient.post('users/api/v1/login',{
        inputUsername: user.username,
        password: user.password
    });
  }

  export const register = (user) => {
    return apiClient.post('users/api/v1/register',{
        username: user.username,
        password: user.password,
        email:user.password
    });
  }
