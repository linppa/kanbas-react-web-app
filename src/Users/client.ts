// Implement client to interact with user routes implemented in the server
import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;
export interface User { 
    _id: string; 
    username: string; 
    password: string; 
    role: string;
    firstName: string, 
    lastName: string };
// User signing in
export const signin = async (credentials: User) => {
  const response = await axios.post( `${USERS_API}/signin`, credentials );
  return response.data;
};
// User signing up
export const signup = async (user: { username: string; password: string; }) => {
  const response = await axios.post(`${USERS_API}/signup`, user);
  return response.data;
};

// User signing out
export const signout = async () => {
  const response = await axios.post(`${USERS_API}/signout`);
  return response.data;
};

// User profile
export const profile = async () => {
  const response = await axios.post(`${USERS_API}/profile`);
  return response.data;
};
// Update profile
export const updateUser = async (user: any) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
// Find all users
export const findAllUsers = async () => {
  const response = await axios.get(`${USERS_API}`);
  return response.data;
};
// Find a user by id
export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};
// Find a user by role
export const findUsersByRole = async (role: string) => {
  const response = await
    axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};
// Create a user
export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};
// Delete a user
export const deleteUser = async (user: any) => {
  const response = await axios.delete(
    `${USERS_API}/${user._id}`);
  return response.data;
};