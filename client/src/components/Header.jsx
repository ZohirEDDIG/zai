import { useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { HiBars3CenterLeft } from "react-icons/hi2";
import useAuth from '../contexts/auth/useAuth';
import Avatar from './Avatar';



const Header = ({ setIsSidebarOpen }) => {
  const { user, logout, isProfileVisible, setIsProfileVisible } = useAuth();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsProfileVisible(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header>
        <div className='p-4 flex justify-between items-start'>

            <div className='flex items-start gap-x-4'>
              <button type='button' onClick={() => setIsSidebarOpen(true)} className='block xl:hidden text-gray-400 text-xl cursor-pointer select-none'><HiBars3CenterLeft /></button>
              <div className='flex flex-col gap-y-2'>
                <h1 className='text-white text-sm  select-none'>ZAI</h1>
                <h3 className='bg-fourth text-white hidden sm:block text-sm px-3 py-1 rounded-full select-none'>Gemeni 2.0 Flash</h3>
              </div>
            </div>

            {
              user ? (
                <div ref={wrapperRef} className='relative'>
                  <Avatar username={user.username} />
                  { isProfileVisible ? (
                    <div  className='bg-third w-[250px] p-4 rounded-md flex flex-col gap-y-4 absolute top-10 right-0 z-10'>
                      <div className='flex items-center gap-x-2'>
                        <Avatar username={user.username} />
                        <h1 className='text-white text-[12px] sm: text-sm'>{user.username}</h1>
                      </div>
                      <button type='button' onClick={logout} className='bg-fourth text-white text-[12px] sm:text-sm w-fit px-2 py-1 ml-auto rounded-md flex items-center gap-x-2 cursor-pointer select-none hover:opacity-80'><IoLogOut /> Logout</button>
                    </div>
                  ) : null }
                </div> 
              ) : ( 
                <div className='flex items-center gap-x-4'>
                  <Link to='/register' className='text-main text-[12px]  sm:text-sm cursor-pointer select-none'>Register</Link>
                  <Link to='/login' className='bg-main text-[12px] text-white  sm:text-sm px-4 py-2 rounded-md cursor-pointer select-none hover:opacity-80'>Login</Link>
                </div>
              )
            }
        </div>

    </header>
  );
};

export default Header;