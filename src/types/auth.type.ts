import z from 'zod';

export const formSchema = z
  .object({
    firstName: z.string().min(3, 'First name must be at least 3 characters.'),
    lastName: z.string().min(3, 'Last name must be at least 3 characters.'),
    userName: z
      .string()
      .min(5, 'Username must be at least 5 characters.')
      .trim()
      .toLowerCase(),
    email: z.string().email('Invalid email address.').trim().toLowerCase(),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    passwordConfirm: z
      .string()
      .min(6, 'Password confirm must be at least 6 characters.'),
  })
  .refine(val => val.password === val.passwordConfirm, {
    message: 'Passwords do not match.',
    path: ['passwordConfirm'],
  });
export type errorResponseType = {
  message: string;
};
export type errorResponseType2 = {
  status: number;
  data: {
    status: string;
    message: string;
  };
};
