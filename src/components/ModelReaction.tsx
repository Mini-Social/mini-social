import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

import ReactionFilterBar from '@/components/ReactionFilterBar';
import UserReactions from '@/components/UserReactions';

interface ModelReactionProps {
  setActiveReaction: React.Dispatch<React.SetStateAction<string | null>>;
  activeReaction: string | null;
}

const ModelReaction = ({ setActiveReaction }: ModelReactionProps) => {
  const [active, setActive] = useState<string>('all');

  return (
    <div className="pointer-events-auto fixed inset-0 z-100 bg-gray-500/50 shadow-[0px_0px_1px_1px_rgba(0_0_0/0.2)]">
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative flex h-[90vh] w-[50%] flex-col rounded-2xl bg-white p-2">
          <div className="flex justify-between">
            <ReactionFilterBar active={active} setActive={setActive} />
            <div
              onClick={() => setActiveReaction(null)}
              className="flex h-9 w-9 items-center justify-center rounded-[50%] bg-[#D3D6DA] hover:bg-[#cecece]"
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
