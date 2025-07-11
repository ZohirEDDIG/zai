import { useState, useMemo, useEffect } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import useAuth from '../auth/useAuth';
import ChatContext from './ChatContext';
import { getChats, newChat, updateChatConv, renameChat, deleteChat } from '../../api/chats';


const ChatProvider = ({ children }) => {
  const { token } = useAuth();
  const [currentChat, setCurrentChat] = useState({});
  const [chatConv, setChatConv] = useState([]);
  const [chats, setChats] = useState([]);
  const queryClient = useQueryClient();

  const getChatsQuery = useQuery({ queryKey: ['chats', token], queryFn: () => getChats(token),  enabled: !!token });

  const newChatMutation = useMutation({ mutationFn: newChat });

  const updateChatConvMutation = useMutation({ mutationFn: updateChatConv });

  const renameChatMutation = useMutation({ mutationFn: renameChat });


  const deleteChatMutation = useMutation({ 
    mutationFn:  deleteChat, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
    onError: (error) => {
      console.error('Error deleting chat:', error);
    },
  });


  const createNewChat = () => {
    setChatConv([]);
    setCurrentChat({});
    newChatMutation.reset();
  };


useEffect(() => {
  if (getChatsQuery.isSuccess && getChatsQuery.data?.data) {
    setChats(getChatsQuery.data.data);
  }
}, [getChatsQuery.isSuccess, getChatsQuery.data]);

useEffect(() => {
  if (newChatMutation.isSuccess && newChatMutation.data?.data) {
    setCurrentChat(newChatMutation.data.data);
    queryClient.invalidateQueries({ queryKey: ['chats'] });
  }
}, [newChatMutation.isSuccess, newChatMutation.data, queryClient]);

useEffect(() => {
  if (updateChatConvMutation.isSuccess && updateChatConvMutation.data?.data) {
    setCurrentChat(updateChatConvMutation.data.data);
    queryClient.invalidateQueries({ queryKey: ['chats'] });
  }
}, [updateChatConvMutation.isSuccess, updateChatConvMutation.data, queryClient]);

useEffect(() => {
  if (renameChatMutation.isSuccess) {
    queryClient.invalidateQueries({ queryKey: ['chats'] });
  }
}, [renameChatMutation.isSuccess, queryClient]);

useEffect(() => {
  if (deleteChatMutation.isSuccess) {
    queryClient.invalidateQueries({ queryKey: ['chats'] });
  }
}, [deleteChatMutation.isSuccess, queryClient]);

  const value = useMemo(
    () => ({
      currentChat,
      setCurrentChat,
      chats,
      setChats,
      chatConv,
      setChatConv,
      createNewChat,
      getChatsQuery,
      newChatMutation,
      updateChatConvMutation,
      renameChatMutation,
      deleteChatMutation, 
    }), [
      currentChat,
      setCurrentChat,
      chats,
      setChats,
      chatConv,
      setChatConv,
      createNewChat,
      getChatsQuery,
      newChatMutation,
      updateChatConvMutation,
      renameChatMutation,
      deleteChatMutation,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;