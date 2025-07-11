import Modal from 'react-modal';
import useAuth from '../../contexts/auth/useAuth';
import useChat from '../../contexts/chat/useChat';

Modal.setAppElement('#root');

const DeleteChatModal = ({ isDeleteChatModalOpen, setIsDeleteChatModalOpen, chatId, setChatToShowItsOptions  }) => {
  const { token } = useAuth();
  const { currentChat, createNewChat, deleteChatMutation  } = useChat();

  const handleDeleteChat = async () => {
    deleteChatMutation.mutate({ chatId, token });
    if(currentChat._id === chatId) {
      createNewChat()
    }
    setIsDeleteChatModalOpen(false);
    setChatToShowItsOptions(null);
  };

  const handleCancelDeleteChat = () => {
    setIsDeleteChatModalOpen(false);
    setChatToShowItsOptions(null);
  }

  return (
    <Modal className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' overlayClassName='bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 right-0 bottom-0 z-[1000]' isOpen={isDeleteChatModalOpen}   onRequestClose={() => setIsDeleteChatModalOpen(false)}  contentLabel="Delete Chat Modal">
      <div className='bg-[#1F1F1F] w-[400px] p-4 rounded-md flex flex-col gap-y-8'>
        <h1 className='text-white text-xl'>Delete chat?</h1>
        <p className='text-gray-200 text-sm'>This will delete all prompts and responses</p>
        <div className='flex justify-end gap-x-4'>
          <button type='button' onClick={handleCancelDeleteChat} className='text-main text-sm cursor-pointer select-none'>Cancel</button>
          <button type='button' onClick={handleDeleteChat}  className={`text-main text-sm cursor-pointer select-none`}>Delete</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteChatModal;