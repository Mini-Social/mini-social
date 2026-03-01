import { useContext, useEffect, useState } from 'react';

import UserSearchModel from '@/components/UserSearchModel';
import LanguageContext from '@/contexts/LanguageContext';
import { useGetSearchUsersQuery } from '@/features/user/user.api.slice';

interface Props {
  open: boolean;
}

const ModelSearch = ({ open }: Props) => {
  const languageContext = useContext(LanguageContext);
  const { data: getUsersSearch } = useGetSearchUsersQuery()
  const [searchUserData, setSearchUserData] = useState<{
        _id: string;
        userName: string;
        firstName: string;
        lastName: string;
        avatar: string;
    }[]>([])
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

  useEffect(() => {
    const setState = (data:{
        _id: string;
        userName: string;
        firstName: string;
        lastName: string;
        avatar: string;
    }[] ) => {
      setSearchUserData(data)
    }
    if(getUsersSearch?.data){
      setState(getUsersSearch.data)
    }
  }, [getUsersSearch?.data])
  if (!languageContext) {
    return null;
  }
  if(!open){
    return null
  }
  const { language, translate } = languageContext;
  return (
    <div
      className="absolute top-full left-0 p-5 bg-background z-998 h-fit w-full rounded-[12px] shadow-[0px_0px_1px_1px_rgba(0,0,0,0.1)] md:right-20"
    >
      <ul>
        {
          searchUserData.map(user => <UserSearchModel key={user._id} firstName={user.firstName} lastName={user.lastName} userName={user.userName} avatar={user.avatar} />)
        }
      </ul>
      {
        searchUserData.length === 0 && translate(language, 'noSearch')
      }
    </div>
  );
};

export default ModelSearch;
