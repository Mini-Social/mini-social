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

const LeftBar = () => (
  <div className="no-scrollbar sticky top-17.5 hidden h-[calc(100vh-70px)] flex-2 shrink-0 overflow-auto bg-white lg:block">
    <div className="">
      <div className="mt-2.5 flex flex-col">
        <LeftBarItem
          src={
            'https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600'
          }
          text="Xuan Duong"
          link="/"
          isUser
        />
        <LeftBarItem src={friends} text="Friends" link="/" />
        <LeftBarItem src={groups} text="Groups" link="/" />
        <LeftBarItem src={market} text="Marketplace" link="/" />
        <LeftBarItem src={watch} text="Watch" link="/" />
        <LeftBarItem src={memories} text="Memories" link="/" />
      </div>
      <div className="px-5">
        <hr className="my-2.5 h-[0.5px] border-none bg-[#d3d3d3]" />
      </div>
      {/* Your shortcuts */}
      <div className="flex flex-col">
        <span className="my-2.5 px-5 text-xs">Your shortcuts</span>
        <LeftBarItem src={events} text="Events" link="/" />
        <LeftBarItem src={gamings} text="Gaming" link="/" />
        <LeftBarItem src={gallery} text="Gallery" link="/" />
        <LeftBarItem src={videos} text="Videos" link="/" />
        <LeftBarItem src={messages} text="Messages" link="/" />
      </div>
      <div className="px-5">
        <hr className="my-2.5 h-[0.5px] border-none bg-[#d3d3d3]" />
      </div>
      <div className="flex flex-col">
        <span className="my-2.5 px-5 text-xs">Others</span>
        <LeftBarItem src={fundraiser} text="Fundraiser" link="/" />
        <LeftBarItem src={tutorials} text="Tutorials" link="/" />
        <LeftBarItem src={courses} text="Courses" link="/" />
      </div>
    </div>
  </div>
);

export default LeftBar;
