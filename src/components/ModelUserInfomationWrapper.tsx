import UserAddressContainer from '@/components/UserAddressContainer';
import { useGetProvincesQuery } from '@/features/address/address.api.slice';
import type { IUser } from '@/types/user.type';

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser;
}
export const ModelUserInformationWrapper = ({ user, setIsVisible }: Props) => {
  const { data: provincesData } = useGetProvincesQuery();
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
