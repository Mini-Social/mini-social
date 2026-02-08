import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import LanguageContext from '@/contexts/LanguageContext';
import { setCredential } from '@/features/auth/auth.slice';
import { useUpdateProfileMutation } from '@/features/user/user.api.slice';
import type { RootState } from '@/store';
import { UseAppDispatch } from '@/store';
import type { errorResponseType2 } from '@/types/auth.type';

type FieldKey = 'firstName' | 'lastName' | 'userName' | 'email';

const AccountSetting = () => {
  const data = useSelector((state: RootState) => state.auth.user);
  const languageContext = useContext(LanguageContext);
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = UseAppDispatch();
  const [editingField, setEditingField] = useState<FieldKey | null>(null);
  const [tempValue, setTempValue] = useState('');
  const startEdit = (key: FieldKey) => {
    setEditingField(key);
    if (data) {
      setTempValue(data[key]);
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const saveEdit = async (key: FieldKey) => {
    try {
      const res = await updateProfile({ [key]: tempValue }).unwrap();
      if (res.data) {
        dispatch(setCredential(res.data));
      }
      toast.success(`Update ${key} successfully!`);
      setEditingField(null);
    } catch (error: unknown) {
      const fieldError = error as errorResponseType2;
      toast.error(fieldError.data.message);
      setEditingField(null);
    }
  };
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  const renderRow = (label: string, key: FieldKey) => {
    const isEditing = editingField === key;
    return (
      <div className="group flex items-center justify-between gap-4 py-2">
        <span className="w-40 shrink-0 text-(--textColor2)">{label}</span>

        {/* Value / Input */}
        <div className="flex-1">
          {isEditing ? (
            <input
              value={tempValue}
              onChange={e => setTempValue(e.target.value)}
              className="w-full max-w-xs rounded border px-3 py-1.5 text-sm focus:outline-none"
            />
          ) : (
            data && <span className="text-gray-400">{data[key]}</span>
          )}
        </div>

        {/* Actions */}
        <div className="ml-4 flex w-20 items-center justify-end gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => saveEdit(key)}
                className="border-none! bg-(--buttonColor)! text-sm! text-green-500! hover:text-green-600!"
                title="Lưu"
              >
                ✔
              </button>
              <button
                onClick={cancelEdit}
                className="border-none! bg-(--buttonColor)! text-sm! text-red-500! hover:text-red-600!"
                title="Hủy"
              >
                ✖
              </button>
            </>
          ) : (
            <button
              onClick={() => startEdit(key)}
              className="border-none! bg-(--buttonColor)! text-gray-400! opacity-0! transition group-hover:opacity-100! hover:text-blue-500!"
              title="Chỉnh sửa"
            >
              ✏️
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-xl">
      <h3 className="mb-6 text-lg font-semibold">
        {language === 'en'
          ? translate(language, 'account') +
            ' ' +
            translate(language, 'information').toLowerCase()
          : translate(language, 'information') +
            ' ' +
            translate(language, 'account').toLowerCase()}
      </h3>

      <div className="divide-y">
        {renderRow(translate(language, 'firstName'), 'firstName')}
        {renderRow(translate(language, 'lastName'), 'lastName')}
        {renderRow(translate(language, 'userName'), 'userName')}
        {renderRow('Email', 'email')}
      </div>
    </div>
  );
};

export default AccountSetting;
