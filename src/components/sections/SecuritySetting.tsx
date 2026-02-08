import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, type SetStateAction } from 'react';
import { useForm, type FieldErrors } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import LanguageContext from '@/contexts/LanguageContext';
import { useUpdatePasswordMutation } from '@/features/user/user.api.slice';
import type { errorResponseType2 } from '@/types/auth.type';

interface Props {
  setIsOpen: React.Dispatch<SetStateAction<string>>;
}
const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, 'Password must be at least 6 characters'),
    password: z.string().min(6, 'New password must be at least 6 characters'),
    passwordConfirm: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine(val => val.password === val.passwordConfirm, {
    message: 'Password do not match',
  });
const SecuritySetting = ({ setIsOpen }: Props) => {
  const [updatePassword] = useUpdatePasswordMutation();
  const { register, handleSubmit } = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });
  const handleSubmitForm = async (data: z.infer<typeof passwordSchema>) => {
    try {
      const res = await updatePassword(data).unwrap();
      setIsOpen('');
      toast.success(res.message);
    } catch (error: unknown) {
      const typeError = error as errorResponseType2;
      toast.error(typeError.data.message);
    }
  };
  const handleError = (error: FieldErrors<z.infer<typeof passwordSchema>>) => {
    const fieldError = Object.values(error)[0];
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
    <form
      onSubmit={handleSubmit(handleSubmitForm, handleError)}
      className="space-y-4"
    >
      <h3 className="text-lg font-semibold">
        {translate(language, 'security')}
      </h3>

      <input
        type="password"
        placeholder={
          language === 'en'
            ? translate(language, 'old') +
              ' ' +
              translate(language, 'password').toLowerCase()
            : translate(language, 'password') +
              ' ' +
              translate(language, 'old').toLowerCase()
        }
        className="w-full rounded border px-3 py-2"
        {...register('oldPassword')}
      />

      <input
        type="password"
        placeholder={
          language === 'en'
            ? translate(language, 'new') +
              ' ' +
              translate(language, 'password').toLowerCase()
            : translate(language, 'password') +
              ' ' +
              translate(language, 'new').toLowerCase()
        }
        className="w-full rounded border px-3 py-2"
        {...register('password')}
      />

      <input
        type="password"
        placeholder={
          translate(language, 'confirm') +
          ' ' +
          translate(language, 'password').toLowerCase()
        }
        className="w-full rounded border px-3 py-2"
        {...register('passwordConfirm')}
      />

      <button className="rounded bg-red-500! px-4 py-2 text-white">
        Đổi mật khẩu
      </button>
    </form>
  );
};

export default SecuritySetting;
