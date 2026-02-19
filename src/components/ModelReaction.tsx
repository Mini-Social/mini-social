import CloseIcon from '@mui/icons-material/Close';

import ReactionFilterBar from '@/components/ReactionFilterBar';
import UserReactions from '@/components/UserReactions';
import { closeReactModel } from '@/features/post/post.slice';
import { UseAppDispatch } from '@/store';
import type { IUserReactionType } from '@/types/user.type';

interface ModelReactionProps {
  dataReactions: Record<string, number>;
  dataUserReactions: IUserReactionType[];
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}
const ModelReaction = ({
  dataReactions,
  dataUserReactions,
  active,
  setActive,
}: ModelReactionProps) => {
  const dispatch = UseAppDispatch();
  return (
    <div className="pointer-events-auto fixed inset-0 z-9999 bg-gray-500/50 shadow-[0px_0px_1px_1px_rgba(0_0_0/0.2)]">
      <div className="flex h-full w-full items-center justify-center">
        <div className="bg-background relative flex h-dvh w-full flex-col rounded-2xl p-2 lg:h-[90vh] lg:w-[50%]">
          <div className="flex justify-between">
            {dataReactions && (
              <ReactionFilterBar
                active={active}
                setActive={setActive}
                reactions={dataReactions}
              />
            )}
            <div
              onClick={() => {
                dispatch(closeReactModel());
                setActive('all');
              }}
              className="flex h-9 w-9 items-center justify-center rounded-[50%] bg-(--closeColor) hover:opacity-80"
            >
              <CloseIcon fontSize="small" className="cursor-pointer" />
            </div>
          </div>

          {dataUserReactions && (
            <UserReactions
              active={active}
              setActive={setActive}
              userReactions={dataUserReactions}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ModelReaction;
