import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { HiBars3CenterLeft } from "react-icons/hi2";
import { FaXmark  } from 'react-icons/fa6';
import { FaRegEdit , FaPen , FaTrash  } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';

import useAuth from '../contexts/auth/useAuth';
import useChat from '../contexts/chat/useChat';

import RenameChatModal from './modals/RenameChatModal';
import DeleteChatModal from './modals/DeleteChatModal';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useAuth();
  const { createNewChat, chats, chatConv, setChatConv, setCurrentChat, getChatsQuery } = useChat();

  const [chatToShowItsOptions, setChatToShowItsOptions] = useState(null);
  const [showChatOptions, setShowChatOptions] = useState(false);

  const [isRenameChatModalOpen, setIsRenameChatModalOpen] = useState(false);
  const [isDeleteChatModalOpen, setIsDeleteChatModalOpen] = useState(false);

  const sidebarRef = useRef(null);


  const [width, setWidth] = useState(window.innerWidth);


  const handleSetChat = (chatId) => {
    const chat = chats.find((chat) => chat._id === chatId)
    setChatConv(chat.cnv);
    setCurrentChat(chat);
    if(width < 1280) setIsSidebarOpen(false);
  };

  const handleShowChatOptions = (chatId) => {
    setChatToShowItsOptions(chatId);
    if(showChatOptions) {
      setShowChatOptions(false);
    } else {
      setShowChatOptions(true);
    }
  };

  const handleOpeRenameChatModal = () => {
    setIsRenameChatModalOpen(true);
    setShowChatOptions(false);
  };

  const handleOpenDeleteChatModal = () => {
    setIsDeleteChatModalOpen(true);
    setShowChatOptions(false);
  };

  const handleCreateNewChat = () => {
    createNewChat();
    if(width < 1280) setIsSidebarOpen(false);
  }


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) && !isRenameChatModalOpen  && !isDeleteChatModalOpen && window.innerWidth < 1280) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRenameChatModalOpen, isDeleteChatModalOpen]);


  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 


  return (

    <aside ref={sidebarRef}  className={`bg-secondary ${isSidebarOpen ? 'max-xl:left-0 xl:w-[250px]' : 'max-xl:left-[-250px] xl:w-[60px]'} max-xl:w-[250px] h-screen p-4 flex flex-col gap-y-10 shadow-md overflow-y-scroll fixed z-10 xl:sticky top-0 transition-[left] xl:transition-[width] duration-200 ease-in-out`}>

        <button type='button' onClick={() => setIsSidebarOpen((prev) => !prev)} className='hidden xl:block text-gray-400 text-xl px-2 cursor-pointer select-none'><HiBars3CenterLeft /></button>
        <button type='button' onClick={() => setIsSidebarOpen(false)} className='block xl:hidden text-gray-400 text-xl px-2 cursor-pointer select-none'><FaXmark /></button>

        <div type='button' onClick={handleCreateNewChat} 
          className={`text-gray-400 p-2 flex items-center gap-x-2 ${chatConv[0] ? 'cursor-pointer rounded-full hover:bg-fourth' : 'opacity-50 pointer-events-none cursor-none'} select-none `}>
            <span  className='text-xl' ><FaRegEdit /> </span>
            <span className='text-sm overflow-hidden whitespace-nowrap overflow-ellipsis'>New Chat</span>
        </div>

        <div className='flex flex-col gap-y-5'>
          
          <h1 className={`text-gray-400  text-base px-2 ${isSidebarOpen ? 'block' : 'hidden'} overflow-hidden whitespace-nowrap overflow-ellipsis`}>Recent</h1> 

          {

            user ? (

              <div className={`flex flex-col gap-y-2 ${!isSidebarOpen ? 'hidden' : ''}`}>

                {

                  getChatsQuery.isPending 

                  ? (<p className='text-gray-400 text-[12px] px-2'>Loading chats...</p> )

                  : getChatsQuery.isError 

                  ? (<p className='text-gray-400 text-[12px] px-2'>Error loading chats...</p>)

                  : getChatsQuery.isSuccess ? (

                    chats.map((chat) => (

                      <div key={chat._id} className='flex justify-between items-start relative'>
                        
                        <p onClick={() => handleSetChat(chat._id)} 
                          className='text-gray-400 text-[12px] w-[90%] px-2 py-1 rounded-full  cursor-pointer select-none  overflow-hidden whitespace-nowrap overflow-ellipsis hover:bg-fourth'
                          >{chat.title}
                        </p>

                        <button type='button' onClick={() => handleShowChatOptions(chat._id)} className='text-gray-400 text-xl  rounded-full  cursor-pointer select-none hover:bg-fourth'>
                          <IoMdMore />
                        </button>

                        { 
                        
                          chatToShowItsOptions === chat._id && showChatOptions && (

                            <div className='w-[100px] bg-fourth py-2 rounded-md flex flex-col  gap-y-1 absolute top-5 right-0 z-10'>

                              <button type='button' onClick={handleOpeRenameChatModal}  
                                className='text-gray-200 text-[12px] text-center py-1 flex justify-center items-center gap-x-2  cursor-pointer select-none hover:bg-third'>
                                  <FaPen /> Rename
                              </button>

                              <button type='button' onClick={handleOpenDeleteChatModal}  
                                className='text-gray-200 text-[12px] text-center py-1 flex justify-center items-center gap-x-2   cursor-pointer select-none hover:bg-third'>
                                  <FaTrash/> Delete
                              </button>

                            </div> 
                          )
                        }

                      </div>

                    ))) : ''
                }

              </div>

            ) : (

                <div className={`bg-fourth ${isSidebarOpen ? 'flex' : 'hidden'} h-[175.14px] p-4 rounded-xl flex-col gap-y-2`}>

                  <h1 className='text-white text-sm'>Login to start saving your chats</h1>

                  <p className='text-gray-200 text-[12px]'>Once you're signed in, you can access your recent chats here.</p>

                  <Link to='/login' className='!text-main text-sm mt-4 !no-underline cursor-pointer select-none'>Login</Link>

                </div>
            )
          }

          <RenameChatModal isRenameChatModalOpen={isRenameChatModalOpen} setIsRenameChatModalOpen={setIsRenameChatModalOpen} chatId={chatToShowItsOptions} setChatToShowItsOptions={setChatToShowItsOptions} />

          <DeleteChatModal isDeleteChatModalOpen={isDeleteChatModalOpen} setIsDeleteChatModalOpen={setIsDeleteChatModalOpen} chatId={chatToShowItsOptions} setChatToShowItsOptions={setChatToShowItsOptions} />

        </div>

    </aside> 
  );
};

export default Sidebar;