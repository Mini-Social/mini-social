import { translateCount } from '@/utils/translateReaction';

interface ReactionFilterItemProps {
  src?: string;
  count?: number;
  title?: string;
  state: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReactionFilterItem = ({
  src,
  count,
  title,
  state,
  active,
  setActive,
  setIsOpenMore,
}: ReactionFilterItemProps) => (
  <li
    className="relative flex cursor-pointer items-center justify-center gap-1.5 px-4 text-[1rem] font-medium text-[#606366] hover:bg-gray-100"
    onClick={() => {
      setActive(state);
      setIsOpenMore(false);
    }}
  >
    {src && <img src={src} alt="" className="h-5 w-5 rounded-[50%]" />}
    {title && <span className={`${active && 'text-[#0806ff]'}`}>{title}</span>}
    {count && <span className="">{translateCount(count)}</span>}
    {active && (
      <div
        className={`absolute right-0 bottom-0 left-0 h-1 w-full bg-[#0806ff]`}
      ></div>
    )}
  </li>
);

export default ReactionFilterItem;
