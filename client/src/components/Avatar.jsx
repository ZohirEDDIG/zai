import { useState, useEffect } from 'react';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import useAuth from '../contexts/auth/useAuth';


const Avatar = ({ username }) => {
  const [avatar, setAvatar] = useState('');
  const { setIsProfileVisible } = useAuth();

  useEffect(() => {
    const generateAvatar = async () => {
      const svg = await createAvatar(initials, {
        seed: username,
        backgroundColor: ['a8c7fa'],
        size: 32
      }).toDataUri();

      setAvatar(svg);
    };

    generateAvatar();
  }, [username]);

  return (
    avatar && <img  className='rounded-full cursor-pointer select-none' src={avatar} alt='User Avatar' onClick={() => setIsProfileVisible((prev) => !prev)} />
  );
};

export default Avatar;