import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

const authHeaders = (token) => ({ headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }});

export const getChats = (token) => {
  return axios.get(`${apiUrl}/chats`, authHeaders(token));
};

export const newChat = ({chat, token}) => {
  return axios.post(`${apiUrl}/chats/new`, chat, authHeaders(token));
};

export const updateChatConv = ({chatId, cnv, token}) => {
  return axios.put(`${apiUrl}/chats/${chatId}/update_conv`, { cnv }, authHeaders(token));
};

export const renameChat = ({chatId, title, token}) => {
  return axios.put(`${apiUrl}/chats/${chatId}/rename`, { title }, authHeaders(token));
};

export const deleteChat = ({chatId, token}) => {
  return axios.delete(`${apiUrl}/chats/${chatId}/delete`, authHeaders(token));
};
