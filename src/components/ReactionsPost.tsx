import angry from '@/assets/icons/angry.svg';
import haha from '@/assets/icons/haha.svg';
import like from '@/assets/icons/like.svg';
import love from '@/assets/icons/love.svg';
import sad from '@/assets/icons/sad.svg';
import wow from '@/assets/icons/wow.svg';
import { translateCount } from '@/utils/translateReaction';

const reaction = {
  like,
  love,
  haha,
  wow,
  sad,
  angry,
};
interface Props {
  count: number;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveReaction: React.Dispatch<React.SetStateAction<string | null>>;
}
const ReacionsPost = ({ count, setIsVisible, setActiveReaction }: Props) => (
  <div className="mx-3 flex items-center justify-between pt-1.5">
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Object.entries(reaction)
          .slice(0, 3)
          .map(([name, url], index) => (
            <div
              key={index}
              className={`w-5 overflow-hidden rounded-[50%] border-2 border-white ${index > 0 ? '-ml-1' : ''}`}
            >
              {' '}
              <img
                src={url}
                alt={name}
                className={`h-full w-full cursor-pointer`}
              />
            </div>
          ))}
      </div>
      <span
        className="cursor-pointer text-[#65686c] hover:underline"
        onClick={() => {
          setActiveReaction('reaction-model');
        }}
      >
        {translateCount(count)}
      </span>
    </div>
    <div className="flex items-center gap-4 text-[#65686c]">
      <span
        className="cursor-pointer hover:underline"
        onClick={() => setIsVisible(true)}
      >
        200 comments
      </span>
      <span className="cursor-pointer hover:underline">10 shares</span>
    </div>
  </div>
);

export default ReacionsPost;
