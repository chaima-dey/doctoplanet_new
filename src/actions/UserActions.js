import axios from "axios";
import url from "../api";
export const RegisterUser = async (user) => {
  try {
    const res = await axios.post(`${url}/user/signup`, { user });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const UpdateUser = async (user, dispatch) => {
  try {
    const res = await axios.post(`${url}/user/update`, { user });

    return res;
  } catch (error) {
    return error.response;
  }
};

export const LoginUser = async (user, dispatch) => {
  try {
    const res = await axios.post(`${url}/user/signin`, { user });
 
    dispatch({
      type: "TOKEN",
      payload: res.data.token,
    });
    dispatch({
      type: "SET_USER",
      payload: res.data.user,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const UploadImage = async (formData, dispatch) => {
  try {
    const res = await axios.post(`${url}/user/uploadimage`, formData);
    dispatch({
      type: "SET_USER",
      payload: res.data,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const UpdatePasswordAction = async (Updates, dispatch) => {
  try {
    const res = await axios.post(`${url}/user/uploadpassword`, Updates); 
    return res
  } catch (error) {  
     return error.response
  }
};
