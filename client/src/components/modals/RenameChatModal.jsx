import { useState } from 'react';
import Modal from 'react-modal';
import useAuth from '../../contexts/auth/useAuth';
import useChat from '../../contexts/chat/useChat';

Modal.setAppElement('#root');


const RenameChatModal = ({ isRenameChatModalOpen, setIsRenameChatModalOpen, chatId, setChatToShowItsOptions  }) => {
  const [title, setTitle] = useState('Simple Test and Respons');

  const { token } = useAuth();
  const { renameChatMutation } = useChat();

  const disabled  = title === '' || title === 'Simple Test and Respons';

  const handleRenameChat = () => {
    renameChatMutation.mutate({ chatId, title, token });
    setIsRenameChatModalOpen(false);
    setTitle('Simple Test and Respons');
    setChatToShowItsOptions(null);
  }

  const handleCancelRenameChat = () => {
    setIsRenameChatModalOpen(false);
    setChatToShowItsOptions(null);
  }


  return (
    <Modal className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' overlayClassName='bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 right-0 bottom-0 z-[1000]' isOpen={isRenameChatModalOpen}   onRequestClose={() => setIsRenameChatModalOpen(false)}  contentLabel="Rename Chat Modal">
      <div className='bg-[#1F1F1F] w-[400px] p-4 rounded-md flex flex-col gap-y-8'>
        <h1 className='text-white text-xl'>Rename this chat</h1>
        <input type="text" id='title' value={title} onChange={(e) => setTitle(e.target.value)} className='text-gray-200 text-sm p-2 border border-gray-400 outline-none  focus:border-[#a8c7fa]'  />
        <div className='flex justify-end gap-x-4'>
          <button type='button' onClick={handleCancelRenameChat} className='text-main text-sm cursor-pointer select-none'>Cancel</button>
          <button type='button' onClick={handleRenameChat}  disabled={disabled} className={`text-main text-sm ${disabled  ? '!text-gray-600 pointer-events-none' : 'cursor-pointer'}  select-none`}>Rename</button>
        </div>
      </div>
    </Modal>
  );
};

export default RenameChatModal;