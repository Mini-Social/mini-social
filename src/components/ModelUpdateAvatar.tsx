import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import React, { useState, type ChangeEvent } from 'react';

import Spinner from '@/components/Spinner';
import { setCredential } from '@/features/auth/auth.slice';
import { useUpdateProfileMutation } from '@/features/user/user.api.slice';
import { UseAppDispatch } from '@/store';

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectFile: React.Dispatch<React.SetStateAction<File | null>>;
  currentAvatar?: string;
  selectFile: File;
}

const ModelUpdateAvatar = ({
  isVisible,
  setIsVisible,
  setSelectFile,
  currentAvatar,
  selectFile,
}: Props) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const dispatch = UseAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(selectFile);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setSelectFile(null);
    setPreviewUrl(null);
    setIsVisible(undefined);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('avatar', selectedFile);
      const res = await updateProfile(formData).unwrap();
      if (res.data) {
        dispatch(setCredential(res.data));
      }
      handleCancel();
    }
  };
  console.log(isLoading)
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background w-full max-w-sm rounded-2xl p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold">Update Profile Picture</h3>
          <button
            onClick={handleCancel}
            className="flex h-8 w-8 items-center justify-center rounded-full! border-none! bg-(--closeColor)! hover:opacity-80"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="group relative">
            <div className="bg-background h-40 w-40 overflow-hidden rounded-full border-4 border-blue-500 shadow-lg">
              <img
                src={previewUrl || currentAvatar}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <label className="absolute right-1 bottom-1 cursor-pointer rounded-full bg-blue-600 p-2 text-white shadow-md transition-all hover:bg-blue-700">
              <PhotoCameraIcon fontSize="small" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <p className="text-center text-sm text-gray-500">
            {selectedFile
              ? `Selected: ${selectedFile.name}`
              : 'Choose a clear photo for your profile'}
          </p>
          <div className="mt-4 flex w-full gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 rounded-xl border-none! bg-(--buttonColor)! px-4 py-2 font-medium text-(--textColor)! transition-colors hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              disabled={!selectedFile || isLoading}
              onClick={handleUpload}
              className={`flex-1 flex items-center justify-center gap-1 rounded-xl px-4 py-2 font-medium! text-white! transition-all ${
                selectedFile || isLoading
                  ? 'bg-blue-600! hover:bg-blue-700!'
                  : 'cursor-not-allowed! bg-blue-300!'
              }`}
            >
              Save Change
              {
                isLoading && <Spinner />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelUpdateAvatar;
