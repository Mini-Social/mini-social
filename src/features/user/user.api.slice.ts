import userService from '@/features/user/user.service';

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string | undefined;
  avatar: string | null;
  bio: string | null;
  gender: string;
  phone: string | null;
  birthDate: string | null;
  role: 'Admin' | 'User';
  friends: [
    {
      _id: string;
      userName: string;
      firstName: string;
      lastName: string;
      avatar: string;
    },
  ];
  isOnline: boolean;
  lastOnline: Date | null;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const useApi = userService.injectEndpoints({
  endpoints: build => ({
    getUserByUserName: build.query<
      {
        message: string;
        data: IUser;
      },
      string
    >({
      query: userName => `getUserByUserName/${userName}`,
    }),
  }),
});
export default useApi;
export const { useGetUserByUserNameQuery } = useApi;
