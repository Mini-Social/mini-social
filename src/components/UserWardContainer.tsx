import { useState } from 'react';

import ModelUserInformation from '@/components/ModelUserInformation';
import { useGetWardsQuery } from '@/features/address/address.api.slice';
import type { IDistrict, IProvince } from '@/types/address.type';
import type { IUser } from '@/types/user.type';

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setProvinceCode: React.Dispatch<React.SetStateAction<number | undefined>>;
  user: IUser;
  provincesData: IProvince[];
  dictrictsData?: IDistrict[];
  initDictrictCode?: number | undefined;
}
const UserWardContainer = ({
  setIsVisible,
  setProvinceCode,
  user,
  provincesData,
  dictrictsData,
  initDictrictCode,
}: Props) => {
  const [dictrictCode, setDictrictCode] = useState<number | undefined>(
    initDictrictCode,
  );
  const { data: wardsData } = useGetWardsQuery(dictrictCode!, {
    skip: !dictrictCode,
  });
  if (user.address) {
    if (!wardsData?.data) {
      return null;
    }
  }
  return (
    <ModelUserInformation
      key={user.address}
      setIsVisible={setIsVisible}
      user={user}
      provincesData={provincesData}
      dictrictsData={dictrictsData}
      wardsData={wardsData?.data}
      setProvinceCode={setProvinceCode}
      setDictrictCode={setDictrictCode}
    />
  );
};
export default UserWardContainer;
