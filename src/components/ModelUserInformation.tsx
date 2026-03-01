import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import LanguageContext from '@/contexts/LanguageContext';
import { useUpdateProfileMutation } from '@/features/user/user.api.slice';
import type { IDistrict, IProvince, IWard } from '@/types/address.type';
import type { IUser } from '@/types/user.type';
import 'react-phone-input-2/lib/style.css';

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setProvinceCode?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setDictrictCode?: React.Dispatch<React.SetStateAction<number | undefined>>;
  user: IUser;
  provincesData: IProvince[];
  dictrictsData?: IDistrict[];
  wardsData?: IWard[];
}
type initType = {
  province: string | number;
  dictrict: string | number;
  ward: string | number;
  gender: string;
  birthday: string;
  phone: {
    phoneWithdialCode: string;
    dialCode: string;
  };
  relationship: string;
};
const ModelUserInformation = ({
  setIsVisible,
  setProvinceCode,
  setDictrictCode,
  user,
  provincesData,
  dictrictsData,
  wardsData,
}: Props) => {
  const [updateProfile] = useUpdateProfileMutation();
  const [wardName, districtName, provinceName] = user.address.split(', ');
  const [errorAddress, setErrorAddress] = useState<{
    dictrict: null | string;
    ward: null | string;
  }>({
    dictrict: null,
    ward: null,
  });
  const [provinceCode, _] = useState<number | null>(() => {
    const provinceCode = provincesData?.find(
      province => province.name === provinceName,
    );
    return provinceCode?.code ?? null;
  });
  const [districtCode, setDistrictCode] = useState<number | null>(() => {
    const districtCode = dictrictsData?.find(
      dictrict => dictrict.name === districtName,
    );
    return districtCode?.code ?? null;
  });
  const [wardCode, setWardCode] = useState<number | null>(() => {
    const wardCode = wardsData?.find(ward => ward.name === wardName);
    return wardCode?.code ?? null;
  });
  const initialformData: initType = {
    province: provinceCode ?? 'default',
    dictrict: districtCode ?? 'default',
    ward: wardCode ?? 'default',
    gender: user.gender || '',
    birthday: user.birthDate || '',
    phone: {
      phoneWithdialCode: user.phone || '',
      dialCode: '',
    },
    relationship: user.relationship || '',
  };
  const [formData, setFormData] = useState<initType>(initialformData);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const provinceName = provincesData.find(
      p => p.code === Number(formData.province),
    )?.name;
    const districtName = dictrictsData?.find(
      d => d.code === Number(formData.dictrict),
    )?.name;
    const wardName = wardsData?.find(
      w => w.code === Number(formData.ward),
    )?.name;
    const phone = formData.phone.phoneWithdialCode.slice(
      formData.phone.dialCode.length,
    );
    const isFullAddress = provinceName && districtName && wardName;

    if (formData.province !== 'default') {
      if (formData.dictrict === 'default') {
        setErrorAddress(pre => ({
          ...pre,
          dictrict: 'The dictrict cannot be left blank',
        }));
      }
      if (formData.ward === 'default') {
        setErrorAddress(pre => ({
          ...pre,
          ward: 'The ward cannot be left blank',
        }));
        return;
      }
    }

    let birthDate = undefined;
    if (formData.birthday) {
      const [year, month, day] = formData.birthday
        .split('-')
        .map(date => Number(date));
      birthDate = new Date(Date.UTC(year, month - 1, day));
    }

    const finalData = {
      address: `${isFullAddress ? wardName + ', ' + districtName + ', ' + provinceName : ''}`,
      gender: formData.gender || '',
      birthDate,
      phone: phone || '',
      relationship: formData.relationship || '',
    };

    updateProfile(finalData);
    setIsVisible(false);
  };
  {
    const languageContext = useContext(LanguageContext);
    if (!languageContext) {
      return null;
    }
    const { language, translate } = languageContext;
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-background relative w-full max-w-md rounded-2xl shadow-xl md:max-w-lg lg:max-w-xl">
          {/* Header */}
          <div className="border-border flex items-center justify-between border-b px-4 py-3">
            <span className="w-8"></span>

            <h2 className="text-lg font-semibold text-(--textColor2)">
              {translate(language, 'edit') +
                ' ' +
                translate(language, 'profile').toLowerCase()}
            </h2>

            <button
              onClick={() => setIsVisible(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full! border-none! bg-(--closeColor)! hover:opacity-80"
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>
          <form action="" onSubmit={handleUpdateProfile}>
            {/* Body */}
            <div className="flex flex-col gap-4 px-4 py-5">
              {/* Item */}
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium text-(--textColor)"
                  htmlFor="address"
                >
                  {translate(language, 'address')}
                </label>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                  <select
                    value={formData.province}
                    className="bg-background border-border no-scrollbar h-10 cursor-pointer rounded-lg border px-3 outline-none focus:border-(--primaryColor)"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      if (setProvinceCode) {
                        setProvinceCode(Number(e.target.value));
                      }
                      setDistrictCode(null);
                      setFormData(pre => ({
                        ...pre,
                        province: e.target.value,
                        dictrict: 'default',
                        ward: 'default',
                      }));
                    }}
                  >
                    <option value="default" className="text-center" disabled>
                      --{' '}
                      {translate(language, 'select') +
                        ' ' +
                        translate(language, 'province')}{' '}
                      --
                    </option>
                    {provincesData &&
                      provincesData.map(province => (
                        <option key={province._id} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                  </select>

                  <select
                    value={formData.dictrict}
                    className={`bg-background border-border no-scrollbar h-10 cursor-pointer rounded-lg border px-3 outline-none focus:border-(--primaryColor) ${errorAddress.dictrict ? 'border-red-600' : ''}`}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      if (setDictrictCode) {
                        setDictrictCode(Number(e.target.value));
                      }
                      setDistrictCode(Number(e.target.value));
                      setWardCode(null);
                      setFormData(pre => ({
                        ...pre,
                        dictrict: e.target.value,
                        ward: 'default',
                      }));
                      setErrorAddress(pre => ({
                        ...pre,
                        dictrict: null,
                      }));
                    }}
                  >
                    <option value="default" className="text-center" disabled>
                      --{' '}
                      {translate(language, 'select') +
                        ' ' +
                        translate(language, 'dictrict')}{' '}
                      --
                    </option>
                    {dictrictsData &&
                      dictrictsData.map(dictrict => (
                        <option key={dictrict._id} value={dictrict.code}>
                          {dictrict.name}
                        </option>
                      ))}
                  </select>

                  <select
                    value={formData.ward}
                    className={`bg-background border-border no-scrollbar h-10 cursor-pointer rounded-lg border px-3 outline-none focus:border-(--primaryColor) ${errorAddress.ward ? 'border-red-600' : ''}`}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setFormData(pre => ({
                        ...pre,
                        ward: e.target.value,
                      }));
                      setErrorAddress(pre => ({
                        ...pre,
                        ward: null,
                      }));
                    }}
                  >
                    <option value="default" className="text-center" disabled>
                      --{' '}
                      {translate(language, 'select') +
                        ' ' +
                        translate(language, 'ward')}{' '}
                      --
                    </option>
                    {wardsData &&
                      districtCode &&
                      wardsData.map(ward => (
                        <option key={ward._id} value={ward.code}>
                          {ward.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium text-(--textColor)"
                  htmlFor="gender"
                >
                  {translate(language, 'gender')}
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      value="Male"
                      name="gender"
                      className="h-4 w-4 accent-blue-700"
                      checked={formData.gender === 'Male'}
                      onChange={handleInputChange}
                    />
                    <span className="text-sm">
                      {translate(language, 'male')}
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      value="Female"
                      name="gender"
                      className="h-4 w-4 accent-(--primaryColor)"
                      checked={formData.gender === 'Female'}
                      onChange={handleInputChange}
                    />
                    <span className="text-sm">
                      {translate(language, 'female')}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium text-(--textColor)"
                  htmlFor="birthday"
                >
                  {translate(language, 'birthday')}
                </label>
                <input
                  type="date"
                  className="border-border h-10 rounded-lg border px-3 outline-none focus:border-(--primaryColor)"
                  id="birthday"
                  name="birthday"
                  defaultValue={formData.birthday.split('T')[0]}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium text-(--textColor)"
                  htmlFor="phone"
                >
                  {translate(language, 'phone')}
                </label>
                <PhoneInput
                  inputStyle={{ background: 'var(--background)' }}
                  dropdownStyle={{ background: 'var(--background)' }}
                  buttonStyle={{ background: 'var(--background)' }}
                  buttonClass="[&_.country:hover]:bg-(--hoverColor)!"
                  dropdownClass="
    [&_.country.highlight]:bg-(--hoverColor)!
    [&_.country:hover]:bg-(--hoverColor)!
  "
                  country={'vn'}
                  value={formData.phone.phoneWithdialCode}
                  onChange={(phone, data: { dialCode: string }) => {
                    setFormData(pre => ({
                      ...pre,
                      phone: {
                        phoneWithdialCode: phone,
                        dialCode: data.dialCode,
                      },
                    }));
                  }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium text-(--textColor)"
                  htmlFor="relationship"
                >
                  {translate(language, 'relationship')}
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="relationship"
                      value="Single"
                      className="h-4 w-4 accent-blue-700"
                      onChange={handleInputChange}
                      checked={formData.relationship === 'Single'}
                    />
                    <span className="text-sm">
                      {translate(language, 'single')}
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="relationship"
                      value="Married"
                      className="h-4 w-4 accent-(--primaryColor)"
                      onChange={handleInputChange}
                      checked={formData.relationship === 'Married'}
                    />
                    <span className="text-sm">
                      {translate(language, 'married')}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-border flex justify-end gap-2 border-t px-4 py-3">
              <button
                onClick={() => setIsVisible(false)}
                className="rounded-lg border-none! bg-(--gray200)! px-4 py-2 text-sm"
              >
                {translate(language, 'cancel')}
              </button>
              <button className="rounded-lg bg-[#0866ff]! px-4 py-2 text-sm text-white hover:opacity-90">
                {translate(language, 'save')}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default ModelUserInformation;
