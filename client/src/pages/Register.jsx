import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../contexts/auth/useAuth';

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  const { registerMutation } = useAuth();

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  useEffect(() => {
    if(registerMutation.isSuccess) {
      navigate('/login');
    }
  }, [registerMutation.isSuccess])


  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center gap-y-8'>

      <div className='max-w-[400px] sm:w-[400px] flex flex-col items-center gap-y-2'>
        <Link to='/' className='text-white text-2xl cursor-pointer select-none'><span className='text-main'>Z</span>AI</Link>
        <h3 className='text-gray-200'>Create your account</h3>
      </div>

      <div>

        <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] sm:w-[400px] p-4 flex flex-col gap-y-8' >

          <div className='flex flex-col gap-y-2'>
            <label htmlFor='username' className='text-white text-[12px] sm:text-base'>Username</label>
            <input type='text' id='username' {...register('username', { required: { value: true , message: 'Username is required'}, pattern: { value: /^[a-zA-Z0-9.-@_]{3,}$/, message: 'Username must be at least 3 characters and contain only letters, numbers, ., _, @, -' } })} 
              className='text-white p-1.5 border-2  border-gray-200 rounded-md outline-none'  />
            {errors.username && <p className='text-[red] text-[12px]'>{errors.username.message}</p>}
          </div>

          <div className='flex flex-col gap-y-2'>
            <label htmlFor='password' className='text-white text-[12px] sm:text-base'>Password</label>
            <div className='relative'>
              <input type={isPasswordVisible ? 'text' : 'password'} id='password' {...register('password', { required: { value: true, message: 'Password is required' }, pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/, message:'Password must be 8-14 characters and include uppercase, lowercase, number'  } })} className='text-white w-full p-1.5 border-2  border-gray-200 rounded-md outline-none placeholder:text-white'  />
              <button  type='button' onClick={() => setIsPasswordVisible((prev) => !prev)} className='text-white absolute right-2 top-3 cursor-pointer select-none'>{ isPasswordVisible ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
            {errors.password && <p className='text-[red] text-[12px]'>{errors.password.message}</p>}
            {registerMutation.isError && <p className='text-[red] text-[12px]'>{registerMutation.error.response.data.message}</p>}
          </div>

          <button type='submit' className='bg-main text-white text-[12px] sm:text-sm px-4 py-2 rounded-md cursor-pointer select-none hover:opacity-80' >{registerMutation.isPending ? 'Registering' : 'Register'}</button>

          <p className='text-white text-[12px] sm:text-base text-center'>You already have an account? <Link to='/login' className='text-main'>Login</Link></p>

        </form>

      </div>

    </main>
  )
}

export default Register;