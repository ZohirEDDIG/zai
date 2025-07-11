import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import useChat from '../contexts/chat/useChat';
import useAuth from '../contexts/auth/useAuth';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth < 1200 ? false : true);
  const { chatConv } = useChat();
  const { user } = useAuth();

  return (
    <main className='flex relative'>

      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className='max-w-[100%] flex-1 flex flex-col gap-y-10'>
        <Header setIsSidebarOpen={setIsSidebarOpen}/>
        <ChatBox />
      </div>

        {!chatConv[0] && (
            <h1 className='text-white text-lg sm:text-xl md:text-2xl absolute  top-1/2 left-1/2 -translate-1/2'>
              { user ? <><span>Hello,</span> <span className='text-main'>{user.username}</span></> :  ( <><span className='text-main'>Z</span>AI, your personal <br /> AI assistant</> )}
            </h1> 
        )}

    </main>
  );
};

export default Home;