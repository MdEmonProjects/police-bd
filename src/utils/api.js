import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const getUsersData = async (id) =>{
  const {data} = await axios.get(`http://localhost:4000/api/users`)
  return data
}

const getSingleUserData = async (id) =>{
  const {data} = await axios.get(`http://localhost:4000/api/users/${id}`)
  return data
}

const loginUser = async (credentials) => {
  const { data } = await axios.post('http://localhost:4000/api/users/login', credentials);
  return data;
};
const verifyToken = async (token) => {
  const configuration = {
    method: "POST",
    url: `http://localhost:4000/api/users/auth-endpoint`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // make the API call
  axios(configuration)
    .then(() => {
      // assign the message in our result to the message we initialized above
      return true;
    })
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {
      console.log(error);
      return false;
    });
};

const registerNewUser = async (formData) => {
  const { data } = await axios.post('http://localhost:4000/api/users/register', formData, {
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
  const { data } = await axios.put(`http://localhost:4000/api/users/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Necessary for file uploads
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export { loginUser, verifyToken, registerNewUser, getSingleUserData, updateData, getUsersData }
