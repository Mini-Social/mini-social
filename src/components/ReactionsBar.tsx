import angry from '@/assets/icons/angry.svg';
import haha from '@/assets/icons/haha.svg';
import like from '@/assets/icons/like.svg';
import love from '@/assets/icons/love.svg';
import sad from '@/assets/icons/sad.svg';
import wow from '@/assets/icons/wow.svg';
import { type ReactionType } from '@/types/type';

const reactions = {
  like,
  love,
  haha,
  wow,
  sad,
  angry,
};
interface ReactionBarProps {
  setState: React.Dispatch<React.SetStateAction<ReactionType>>;
  setShowBar: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
}

const ReactionsBar = ({
  setState,
  setShowBar,
  isVisible,
}: ReactionBarProps) => (
  <div
    className={`bg-background absolute -top-8 left-0 flex items-center gap-2 rounded-4xl border p-1 transition-all delay-200 duration-200 ${isVisible ? 'pointer-events-auto visible group-hover:-translate-y-3 group-hover:opacity-100' : 'pointer-events-none invisible opacity-0'}`}
  >
    {Object.entries(reactions).map(([name, url], index) => (
      <div
        key={index}
        className={`w-10 overflow-hidden rounded-[50%] border-2 border-white transition-all duration-150 hover:scale-125 ${index > 0 ? '-ml-1' : ''}`}
        onClick={e => {
          setState(name as ReactionType);
          setShowBar(false);
          e.stopPropagation();
        }}
      >
        {' '}
        <img src={url} alt={name} className={`h-full w-full cursor-pointer`} />
      </div>
    ))}
    <div className="absolute -bottom-4 left-0 h-5 w-full bg-transparent" />
  </div>
);

export default ReactionsBar;
