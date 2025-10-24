import axios from 'axios';

const API_BASE = 'http://localhost:5000/api'; // Replace with your backend URL

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getSkills = async () => {
  try {
    const response = await axios.get(`${API_BASE}/skills`);
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
};
