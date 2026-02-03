import apiSlice from '@/app/api.slice';
import { type IUser } from '@/types/user.type';

const useApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getUserByUserName: build.query<
      {
        message: string;
        data: IUser;
      },
      string
    >({
      query: userName => ({
        url: `user/getUserByUserName/${userName}`,
        credentials: 'include',
      }),
      providesTags: result => {
        if (result?.data) {
          const final = [
            {
              type: 'User' as const,
              id: result.data._id,
            },
            {
              type: 'User' as const,
              id: 'LIST',
            },
          ];
          return final;
        }
        return [
          {
            type: 'User' as const,
            id: 'LIST',
          },
        ];
      },
    }),
    updateProfile: build.mutation<{ status: string; data: IUser }, object>({
      query: body => ({
        url: 'user/update-profile',
        method: 'PUT',
        credentials: 'include',
        body,
      }),
      invalidatesTags: result => [
        {
          type: 'User' as const,
          id: result?.data._id,
        },
        {
          type: 'Posts' as const,
          id: result?.data._id,
        },
      ],
    }),
  }),
});
export default useApi;
export const { useGetUserByUserNameQuery, useUpdateProfileMutation } = useApi;
