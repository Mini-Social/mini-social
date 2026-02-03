import apiSlice from '@/app/api.slice';
import type { IDistrict, IProvince, IWard } from '@/types/address.type';

const addressApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProvinces: builder.query<{ status: string; data: IProvince[] }, void>({
      query: () => 'address/getProvinces',
    }),
    getDistricts: builder.query<{ status: string; data: IDistrict[] }, number>({
      query: province_code => `address/getDistricts/${province_code}`,
    }),
    getWards: builder.query<{ status: string; data: IWard[] }, number>({
      query: district_code => `address/getWards/${district_code}`,
    }),
  }),
});

export const { useGetProvincesQuery, useGetDistrictsQuery, useGetWardsQuery } =
  addressApi;
