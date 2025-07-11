import { useContext } from 'react';

import ChatContext from './ChatContext';

const useChat = () => useContext(ChatContext);

export default useChat;