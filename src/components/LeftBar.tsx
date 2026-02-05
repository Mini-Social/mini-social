import { useContext } from 'react';
import { useSelector } from 'react-redux';

import noAvatar from '@/assets/avatars/noavatar.png';
import courses from '@/assets/icons/courses.png';
import events from '@/assets/icons/events.png';
import friends from '@/assets/icons/friends.png';
import fundraiser from '@/assets/icons/fundraiser.png';
import gallery from '@/assets/icons/gallery.png';
import gamings from '@/assets/icons/gamings.png';
import groups from '@/assets/icons/groups.png';
import market from '@/assets/icons/market.png';
import memories from '@/assets/icons/memories.png';
import messages from '@/assets/icons/messages.png';
import tutorials from '@/assets/icons/tutorials.png';
import videos from '@/assets/icons/videos.png';
import watch from '@/assets/icons/watch.png';
import LeftBarItem from '@/components/LeftBarItem';
import LanguageContext from '@/contexts/LanguageContext';
import type { RootState } from '@/store';

const API_URL = import.meta.env.VITE_API_URL;
const LeftBar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <div className="no-scrollbar bg-background sticky top-17.5 hidden h-[calc(100vh-70px)] flex-2 shrink-0 overflow-auto lg:block">
      <div className="">
        <div className="mt-2.5 flex flex-col">
          <LeftBarItem
            src={
              (user?.avatar && API_URL + `/avatars/${user.avatar}`) || noAvatar
            }
            text={user && user?.firstName + ' ' + user?.lastName}
            link={`/profile/${user?.userName}`}
            isUser
          />
          <LeftBarItem
            src={friends}
            text={translate(language, 'friend')}
            link="/"
          />
          <LeftBarItem
            src={groups}
            text={translate(language, 'group')}
            link="/"
          />
          <LeftBarItem
            src={market}
            text={translate(language, 'marketplace')}
            link="/"
          />
          <LeftBarItem
            src={watch}
            text={translate(language, 'watch')}
            link="/"
          />
          <LeftBarItem
            src={memories}
            text={translate(language, 'memories')}
            link="/"
          />
        </div>
        <div className="px-5">
          <hr className="bg-border my-2.5 h-[0.5px] border-none" />
        </div>
        {/* Your shortcuts */}
        <div className="flex flex-col">
          <span className="my-2.5 px-5 text-xs">
            {translate(language, 'shortcut')}
          </span>
          <LeftBarItem
            src={events}
            text={translate(language, 'event')}
            link="/"
          />
          <LeftBarItem
            src={gamings}
            text={translate(language, 'gaming')}
            link="/"
          />
          <LeftBarItem
            src={gallery}
            text={translate(language, 'gallery')}
            link="/"
          />
          <LeftBarItem
            src={videos}
            text={translate(language, 'video')}
            link="/"
          />
          <LeftBarItem
            src={messages}
            text={translate(language, 'message')}
            link="/"
          />
        </div>
        <div className="px-5">
          <hr className="bg-border my-2.5 h-[0.5px] border-none" />
        </div>
        <div className="flex flex-col">
          <span className="my-2.5 px-5 text-xs">
            {translate(language, 'other')}
          </span>
          <LeftBarItem
            src={fundraiser}
            text={translate(language, 'fundraiser')}
            link="/"
          />
          <LeftBarItem
            src={tutorials}
            text={translate(language, 'tutorial')}
            link="/"
          />
          <LeftBarItem
            src={courses}
            text={translate(language, 'course')}
            link="/"
          />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
