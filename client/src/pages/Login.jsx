import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../contexts/auth/useAuth';
import useChat from '../contexts/chat/useChat';

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { register, handleSubmit, formState } = useForm();  
  const { errors } = formState;

  const navigate = useNavigate();

  const { loginMutation, setToken } = useAuth();
  const { createNewChat } = useChat()

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  useEffect(() => {
    if(loginMutation.isSuccess) {
      const token = loginMutation.data.data.token;
      setToken(token);
      window.localStorage.setItem('token', token);

      navigate('/');

      createNewChat();
    }
  }, [loginMutation.isSuccess]);

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center gap-y-8'>

      <div className='max-w-[400px] sm:w-[400px] flex flex-col items-center gap-y-2'>
        <Link to='/' className='text-white text-2xl  cursor-pointer select-none'><span className='text-main'>Z</span>AI</Link>
        <h3 className='text-gray-200'>Login to <span className='text-main'>Z</span>AI</h3>
      </div>

      <div>

        <form  onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] sm:w-[400px] p-4 flex flex-col gap-y-8'>

          <div className='flex flex-col gap-y-2'>
            <label htmlFor='username' className='text-white text-[12px] sm:text-base'>Username</label>
            <input type='text' id='username' {...register('username', { required: { value: true , message: 'Username is required' }})} 
              className='text-white p-1.5 border-2 border-gray-200 rounded-md outline-none'  />
            {errors.username && <p className='text-[red] text-[12px]'>{errors.username.message}</p>}
          </div>

          <div className='flex flex-col gap-y-2'>
            <label htmlFor='password' className='text-white text-[12px] sm:text-base'>Password</label>
            <div className='relative'>
              <input type={isPasswordVisible ? 'text' : 'password'} id='password' {...register('password', { required: { value: true, message: 'Password is required' }})} 
                className='text-white text-[12px] sm:text-base w-full p-1.5 border-2  border-gray-200 rounded-md outline-none' />
              <button type='button' onClick={() => setIsPasswordVisible((prev) => !prev)} className='text-white absolute right-2 top-3 cursor-pointer select-none' >{ isPasswordVisible ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
            {errors.password && <p className='text-[red] text-[12px]'>{errors.password.message}</p>}
            {loginMutation.isError && <p className='text-[red] text-[12px]'>{loginMutation.error.response.data.message || 'Something went wrong'}</p>}
          </div>

          <button type='submit' className='bg-main text-white text-[12px] sm:text-base px-4 py-2 rounded-md cursor-pointer select-none hover:opacity-80'>{loginMutation.isPending ? 'Logging' : 'Login'}</button>

          <p className='text-white text-[12px] sm:text-base text-center'>You don't have an account? <Link to='/register' className='text-main'>Register</Link></p>

        </form>

      </div>

    </main>
  );
};

export default Login; 