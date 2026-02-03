import { useState } from 'react';

import UserWardContainer from '@/components/UserWardContainer';
import { useGetDistrictsQuery } from '@/features/address/address.api.slice';
import type { IProvince } from '@/types/address.type';
import type { IUser } from '@/types/user.type';

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser;
  provincesData: IProvince[];
  initProvinceCode?: number | undefined;
}
const UserAddressContainer = ({
  setIsVisible,
  user,
  provincesData,
  initProvinceCode,
}: Props) => {
  const [provinceCode, setProvinceCode] = useState<number | undefined>(
    initProvinceCode,
  );
  const { data: dictrictsData } = useGetDistrictsQuery(provinceCode!, {
    skip: !provinceCode,
  });
  let initDictrictCode: number | undefined = undefined;

  if (user.address) {
    if (!dictrictsData?.data) {
      return null;
    }
    const districtName = user.address.split(', ')[1];
    initDictrictCode = dictrictsData?.data.find(
      d => d.name === districtName,
    )?.code;
  }
  return (
    <UserWardContainer
      key={user.address}
      setIsVisible={setIsVisible}
      user={user}
      provincesData={provincesData}
      initDictrictCode={initDictrictCode}
      dictrictsData={dictrictsData?.data}
      setProvinceCode={setProvinceCode}
    />
  );
};
export default UserAddressContainer;
