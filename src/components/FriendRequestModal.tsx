import PersonIcon from '@mui/icons-material/Person';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import noAvatar from '@/assets/avatars/noavatar.png';
import {
  useAcceptFriendRequestMutation,
  useGetFriendRequestsQuery,
  useRejectFriendRequestMutation,
} from '@/features/friendRequest/friendRequest.slice.api';
import { socket } from '@/socket';
import { type RootState } from '@/store';
import type { IFriendRequest } from '@/types/friendRequest.type';

const API_URL = import.meta.env.VITE_API_URL;
const FriendRequestDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: friendRequests, refetch: refetchReceivedRequests } =
    useGetFriendRequestsQuery();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [rejectFriendRequest] = useRejectFriendRequestMutation();
  const [requests, setRequests] = useState<IFriendRequest[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    socket.on('sendFriendRequest', (requestData: IFriendRequest) => {
      setRequests(prev => [...prev, requestData]);
    });
    socket.on('cancelFriendRequest', (requestId: string) => {
      setRequests(prev => prev.filter(req => req._id !== requestId));
    });
    socket.on(
      'acceptFriendRequest',
      ({ requestData }: { requestData: IFriendRequest }) => {
        setRequests(prev => prev.filter(req => req._id !== requestData._id));
      },
    );
  }, []);
  useEffect(() => {
    const setRequestsData = () => {
      if (friendRequests?.data) {
        setRequests(friendRequests.data as IFriendRequest[]);
      }
    };
    setRequestsData();
  }, [friendRequests]);
  if (!user) {
    return null;
  }
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-(--gray200)"
        onClick={() => setIsOpen(!isOpen)}
      >
        {' '}
        <PersonIcon />
        {requests.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-[50%] bg-red-500 text-[12px] font-bold text-white">
            {requests.length}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="bg-background animate-in slide-in-from-top-2 absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border shadow-2xl duration-200">
          <div className="border--border flex items-center justify-between border-b p-4">
            <h3 className="text-lg font-bold text-(--textColor)">
              Lời mời kết bạn
            </h3>
          </div>

          <div className="custom-scrollbar max-h-[400px] overflow-y-auto">
            {requests && requests.length > 0 ? (
              requests.map(req => (
                <Link key={req._id} to={`/profile/${req.sender.userName}`}>
                  <div className="group flex items-start gap-3 p-3 transition-colors hover:bg-(--hoverColor)">
                    <img
                      src={
                        req.sender.avatar
                          ? API_URL + `/avatars/${req.sender.avatar}`
                          : noAvatar
                      }
                      className="h-12 w-12 rounded-full object-cover shadow-sm"
                      alt="avatar"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm leading-tight font-semibold text-(--textColor)">
                            {req.sender.firstName} {req.sender.lastName}
                          </p>
                          {/* <p className="text-gray-400 text-[11px] mt-1">
                          {req.mutualFriendsCount} bạn chung • {req.sender.address}
                        </p> */}
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button
                          className="flex-1 rounded-md border-none! bg-blue-600! py-1.5 text-xs font-bold text-white! transition hover:bg-blue-500!"
                          onClick={e => {
                            e.preventDefault();
                            acceptFriendRequest(req._id);
                            refetchReceivedRequests();
                            socket.emit('acceptFriendRequest', {
                              requestData: req,
                            });
                          }}
                        >
                          Xác nhận
                        </button>
                        <button
                          className="flex-1 rounded-md border-none! bg-[#4e4f50]! py-1.5 text-xs font-bold text-gray-200! transition hover:bg-[#5e5f60]!"
                          onClick={e => {
                            e.preventDefault();
                            setRequests(prev =>
                              prev.filter(fr => fr._id !== req._id),
                            );
                            rejectFriendRequest(req._id);
                            refetchReceivedRequests();
                            socket.emit('rejectFriendRequest', req);
                          }}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-gray-400 italic">
                Không có lời mời nào.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendRequestDropdown;
