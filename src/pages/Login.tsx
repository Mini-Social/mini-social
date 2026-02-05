import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm, type SubmitHandler, type FieldErrors } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import LanguageContext from '@/contexts/LanguageContext';
import { signInThunk } from '@/features/auth/auth.api.slice';
import { UseAppDispatch } from '@/store';

type errorResponseType = {
  message: string;
};
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

const Login = () => {
  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const dispatch = UseAppDispatch();
  const navigate = useNavigate();
  const handleSubmitForm: SubmitHandler<
    z.infer<typeof formSchema>
  > = async data => {
    try {
      await dispatch(signInThunk(data)).unwrap();
      navigate('/');
      toast.success('Login successfully!');
    } catch (error: unknown) {
      const errorType = error as errorResponseType;
      toast.error(errorType.message);
    }
  };
  const onInvalid = (errors: FieldErrors<z.infer<typeof formSchema>>) => {
    if (errors.email) {
      toast.error(errors.email.message);
    } else if (errors.password) {
      toast.error(errors.password.message);
    }
  };
   const languageContext = useContext(LanguageContext);
      if (!languageContext) {
        return null;
      }
      const { language, translate } = languageContext;
  return (
    <>
      <div className="flex min-h-150 w-[90%] overflow-hidden rounded-[10px] md:w-[80%] xl:w-[60%]">
        {/* Left */}
        <div className="hidden flex-1 flex-col gap-7.5 bg-[linear-gradient(rgba(14,165,233,0.4),rgba(79,70,229,0.4)),url(https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600)] bg-cover bg-center p-7.5 text-white md:flex xl:p-12.5">
          <h1 className="text-[70px]! font-bold xl:text-[100px]! xl:leading-25!">
            Hello World
          </h1>
          <span className="text-[1rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </span>
          <span>{translate(language, 'registerText')}</span>
          <Link to={'/register'}>
            <button className="w-full rounded-none! bg-[#725dfd]! font-bold! text-white! outline-none! md:w-[50%]">
                {translate(language, 'register')}
              </button>
          </Link>
        </div>
        {/* Right */}
        <div className="flex flex-1 flex-col justify-center gap-12.5 bg-(--background-primary) p-12.5 md:p-7.5">
          <h2 className="text-[2rem] font-bold text-(--textColor)">{translate(language, 'login')}</h2>

          <form action="" onSubmit={handleSubmit(handleSubmitForm, onInvalid)}>
            <div className="flex flex-col gap-7.5">
              <input
                type="email"
                placeholder="Email"
                className="w-full border-b border-b-border px-2.5 py-5 outline-none"
                {...register('email')}
              />
              <input
                type="password"
                placeholder={translate(language, 'password')}
                className="w-full border-b border-b-border px-2.5 py-5 outline-none"
                {...register('password')}
              />
              <button className="w-full rounded-none! bg-[#725dfd]! font-bold! text-white! outline-none! md:w-[50%]">
                {translate(language, 'login')}
              </button>
            </div>
            <div className="mt-7.5 text-center md:hidden">
              <Link to="/register" className="mb-2.5 underline!">
                {translate(language, 'registerText')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
