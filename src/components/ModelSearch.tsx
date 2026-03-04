
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useContext, useEffect, useState } from 'react';

import UserSearchModel from '@/components/UserSearchModel';
import LanguageContext from '@/contexts/LanguageContext';
import { useGetHistoryQuery } from '@/features/user/user.api.slice';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchUserData: {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }[];
}

const ModelSearch = ({ open, setOpen, searchTerm, setSearchTerm, searchUserData }: Props) => {
  const languageContext = useContext(LanguageContext);

  const { data } = useGetHistoryQuery(undefined, {
    skip: !open || searchTerm?.length > 0, refetchOnMountOrArgChange: true
  });
  const [historyData, setHistoryData] = useState<{searchedUser: {
    _id: string,
    userName: string,
    firstName: string,
    lastName: string,
    avatar: string
  }}[]>([])
  useEffect(() => {
    if(data?.data){
      const setState = () => {
        setHistoryData(data.data)
      }
      setState()
    }
  }, [data])
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (open && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);
  const handleDeleteSearchUser = (id: string) => {
    setHistoryData(pre => pre.filter(u => u.searchedUser._id !== id))
  }
  if (!languageContext || !open) {return null;}
  const { language, translate } = languageContext;
  return (
    <div
      className="absolute top-full left-0 bg-background z-999 h-fit w-full rounded-[12px] shadow-xl border border-border"
      onMouseDown={(e) => e.preventDefault()}
    >
      {searchTerm.length > 0 ? (
        <div className="flex flex-col">
          <div className="flex items-center p-3 gap-2">
          <div className='cursor-pointer' onClick={() => {
              setOpen(false);
              setSearchTerm('');
              (document.activeElement as HTMLElement).blur()
            }}>
              <ArrowBackIcon fontSize='small'/>
            </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase">
            Kết quả tìm kiếm
          </p>
          </div>
          {searchUserData.length > 0 ? (
            searchUserData.map((user) => (
              <UserSearchModel key={user._id} {...user} isHistory={false} setOpen={setOpen} setSearchTerm={setSearchTerm}/>
            ))
          ) : (
            <p className="p-4 text-center text-xs text-muted-foreground">
              {translate(language, 'noSearch')}
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center p-3 gap-2">
            <div className='cursor-pointer' onClick={() => {
              setOpen(false);
               setSearchTerm('');
              (document.activeElement as HTMLElement).blur()
            }}>
              <ArrowBackIcon fontSize='small'/>
            </div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Tìm kiếm gần đây
            </p>

          </div>

          {historyData && historyData.length > 0 ? (
            historyData.map((item) => (
              <div key={item.searchedUser._id} className="relative group">
                <UserSearchModel
                  isHistory={true}
                  _id={item.searchedUser._id}
                  firstName={item.searchedUser.firstName}
                  lastName={item.searchedUser.lastName}
                  userName={item.searchedUser.userName}
                  avatar={item.searchedUser.avatar}
                  setOpen={setOpen}
                  setSearchTerm={setSearchTerm}
                  handleDeleteSearchUser={handleDeleteSearchUser}
                />
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-xs text-muted-foreground italic">
              {translate(language, 'noSearchRecently')}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ModelSearch;
