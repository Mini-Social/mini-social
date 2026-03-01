import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm, type FieldErrors } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import LanguageContext from '@/contexts/LanguageContext';
import { signUpThunk } from '@/features/auth/auth.api.slice';
import { UseAppDispatch } from '@/store';
import { type errorResponseType, formSchema } from '@/types/auth.type';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { isLoading },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const dispatch = UseAppDispatch();
  const navigate = useNavigate();
  const handleSubmitForm = async (data: z.infer<typeof formSchema>) => {
    try {
      await dispatch(signUpThunk(data)).unwrap();
      navigate('/');
    } catch (error: unknown) {
      const typeError = error as errorResponseType;
      toast.error(typeError.message);
    }
  };
  const onInvalid = (errors: FieldErrors<z.infer<typeof formSchema>>) => {
    const fieldError = Object.values(errors)[0];
    if (fieldError?.message) {
      toast.error(fieldError.message);
    }
  };
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <div className="flex min-h-150 w-[90%] flex-row-reverse overflow-hidden rounded-[10px] md:w-[80%] xl:w-[60%]">
      {/* Left */}
      <div className="hidden flex-1 flex-col gap-7.5 bg-[linear-gradient(rgba(14,165,233,0.4),rgba(79,70,229,0.4)),url(https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600)] bg-cover bg-center p-7.5 text-white md:flex xl:p-12.5">
        <h1 className="text-[70px]! font-bold xl:text-[100px]! xl:leading-25!">
          Xuan Social.
        </h1>
        <span className="text-[1rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
          alias totam numquam ipsa exercitationem dignissimos, error nam,
          consequatur.
        </span>
        <span>{translate(language, 'loginText')}</span>
        <Link to={'/login'}>
          <button
            className={`w-full rounded-none! bg-[#725dfd]! font-bold! text-white! outline-none! md:w-[50%] ${isLoading ? 'cursor-not-allowed! opacity-50' : ''}`}
            disabled={isLoading}
          >
            {translate(language, 'login')}
          </button>
        </Link>
      </div>
      {/* Right */}
      <div className="flex flex-1 flex-col justify-center gap-5 bg-(--background-primary) p-12.5 md:p-7.5">
        <h2 className="text-[2rem] font-bold text-(--textColor)">
          {translate(language, 'register')}
        </h2>

        <form action="" onSubmit={handleSubmit(handleSubmitForm, onInvalid)}>
          <div className="flex flex-col gap-7.5">
            <div className="flex gap-5">
              <input
                type="text"
                placeholder={translate(language, 'firstName')}
                className="w-full border-b border-b-gray-300 px-2.5 py-5 outline-none"
                {...register('firstName')}
              />
              <input
                type="text"
                placeholder={translate(language, 'lastName')}
                className="w-full border-b border-b-gray-300 px-2.5 py-5 outline-none"
                {...register('lastName')}
              />
            </div>
            <input
              type="text"
              placeholder={translate(language, 'userName')}
              className="w-full border-b border-b-gray-300 px-2.5 py-5 outline-none"
              {...register('userName')}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-b-gray-300 px-2.5 py-5 outline-none"
              {...register('email')}
            />
            <input
              type="password"
              placeholder={translate(language, 'password')}
              className="w-full border-b border-b-gray-300 px-2.5 py-5 outline-none"
              {...register('password')}
            />
            <input
              type="password"
              placeholder={
                translate(language, 'confirm') +
                ' ' +
                translate(language, 'password').toLowerCase()
              }
              className="w-full border-b border-b-gray-300 px-2.5 py-5 outline-none"
              {...register('passwordConfirm')}
            />
            <button
              className={`w-full rounded-none! bg-[#725dfd]! font-bold! text-white! outline-none! md:w-[50%] ${isLoading ? 'cursor-not-allowed! opacity-50' : ''}`}
              disabled={isLoading}
            >
              {translate(language, 'register')}
            </button>
          </div>
          <div className="mt-7.5 text-center md:hidden">
            <Link to="/login" className="mb-2.5 underline!">
              {translate(language, 'loginText')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
