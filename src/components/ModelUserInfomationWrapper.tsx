import { useEffect } from 'react';

import UserAddressContainer from '@/components/UserAddressContainer';
import { useGetProvincesQuery } from '@/features/address/address.api.slice';
import type { IUser } from '@/types/user.type';

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser;
  isVisible: boolean;
}
export const ModelUserInformationWrapper = ({
  user,
  setIsVisible,
  isVisible,
}: Props) => {
  const { data: provincesData } = useGetProvincesQuery();
  useEffect(() => {
    if (isVisible) {
      document.body.style.paddingRight = '15px';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isVisible]);
  if (!provincesData?.data) {
    return null;
  }
  let initProvinceCode: number | undefined = undefined;

  if (user.address) {
    const provinceName = user.address.split(', ')[2];
    initProvinceCode = provincesData?.data.find(
      p => p.name === provinceName,
    )?.code;
  }
  return (
    <UserAddressContainer
      key={initProvinceCode}
      setIsVisible={setIsVisible}
      user={user}
      provincesData={provincesData?.data}
      initProvinceCode={initProvinceCode}
    />
  );
};
