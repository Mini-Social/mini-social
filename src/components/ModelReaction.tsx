import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';

import ReactionFilterBar from '@/components/ReactionFilterBar';
import UserReactions from '@/components/UserReactions';

interface ModelReactionProps {
  setActiveReaction: React.Dispatch<React.SetStateAction<string | null>>;
  activeReaction: string | null;
}

const ModelReaction = ({
  activeReaction,
  setActiveReaction,
}: ModelReactionProps) => {
  const [active, setActive] = useState<string>('all');
  useEffect(() => {
    if (activeReaction === 'reaction-model') {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (!isMobile) {
        document.body.style.paddingRight = '15px';
      }

      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [activeReaction]);
  return (
    <div className="pointer-events-auto fixed inset-0 z-9999 bg-gray-500/50 shadow-[0px_0px_1px_1px_rgba(0_0_0/0.2)]">
      <div className="flex h-full w-full items-center justify-center">
        <div className="bg-background relative flex h-dvh w-full flex-col rounded-2xl p-2 lg:h-[90vh] lg:w-[50%]">
          <div className="flex justify-between">
            <ReactionFilterBar active={active} setActive={setActive} />
            <div
              onClick={() => setActiveReaction(null)}
              className="flex h-9 w-9 items-center justify-center rounded-[50%] bg-(--closeColor) hover:opacity-80"
            >
              <CloseIcon fontSize="small" className="cursor-pointer" />
            </div>
          </div>

          <UserReactions active={active} />
        </div>
      </div>
    </div>
  );
};

export default ModelReaction;
