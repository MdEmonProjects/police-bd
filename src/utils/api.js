import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_SERVER_URL;

const getUsersData = async () =>{
  const {data} = await axios.get(`${API_URL}/api/users`)
  return data
}

const getSingleUserData = async (id) =>{
  const {data} = await axios.get(`${API_URL}/api/users/${id}`)
  return data
}

const loginUser = async (credentials) => {
  const { data } = await axios.post(`${API_URL}/api/users/login`, credentials);
  return data;
};
const loginAdmin = async (credentials) => {
  const { data } = await axios.post(`${API_URL}/api/users/admin/login`, credentials);
  return data;
};
const verifyToken = async (token) => {
  const configuration = {
    method: "POST",
    url: `${API_URL}/api/users/auth-endpoint`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios(configuration);
    return res.data;  // Returns the response data
  } catch (error) {
    console.error("Error in token verification:", error);
    throw new Error("Token verification failed");  // Throws an error if the request fails
  }
};


const adminVerifyToken = async (token) => {
  const configuration = {
    method: "POST",
    url: `${API_URL}/api/users/admin/auth-endpoint`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios(configuration);
    return res.data;
  } catch (error) {
    console.error("Error in token verification:", error);
    throw new Error("Token verification failed"); 
  }
};

const registerNewUser = async (formData) => {
  const { data } = await axios.post(`${API_URL}/api/users/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Necessary for file uploads
    },
  });
  cookies.remove("TOKEN")
  return data;
};

const updateData = async (id, formData) =>{
  console.log(id);
  
  const token = cookies.get("TOKEN");
  const adminToken = cookies.get("ADMIN_TOKEN");
  const { data } = await axios.put(`${API_URL}/api/users/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Necessary for file uploads
      Authorization: `Bearer ${adminToken? adminToken : token}`,
    },
  });
  return data;
}
const deleteData = async (id) => {
  const token = cookies.get("ADMIN_TOKEN");
  console.log(token); // Check if the token is being retrieved correctly

  try {
    const { data } = await axios.delete(
      `${API_URL}/api/users/admin/deletedata/${id}`, // URL is the first parameter
      {
        headers: { // Headers should be the second parameter for delete
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Correct header format
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error deleting data:", error);
    if (error.response) {
      console.error("Response error:", error.response.data);
      throw new Error(error.response.data.error || "Failed to delete data");
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response from server. Please try again later.");
    } else {
      console.error("Error:", error.message);
      throw new Error("An unexpected error occurred.");
    }
  }
};



const insertNewField = async (formData) => {
  console.log(formData);
  
  const { data } = await axios.post(`${API_URL}/api/users/save_fields`, JSON.stringify(formData), {
    headers: {
      'Content-Type': 'application/json', // Necessary for file uploads
    },
  });
  return data;
};
const fetchField = async () => {
  const { data } = await axios.get(`${API_URL}/api/users/admin/get_fields`);
  // console.log(data);
  
  return data;
};
export { loginUser, verifyToken, registerNewUser, getSingleUserData, updateData, getUsersData, insertNewField, fetchField, adminVerifyToken, loginAdmin, deleteData }
