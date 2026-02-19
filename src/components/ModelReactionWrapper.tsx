import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ModelReaction from '@/components/ModelReaction';
import type { RootState } from '@/store';

const ModelReactionWrapper = () => {
  const data = useSelector((state: RootState) => state.post.reactModel);
  const [active, setActive] = useState<string>('all');
  useEffect(() => {
    if (data.open) {
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
  }, [data.open]);
  if (!data.open) {
    return null;
  }
  {
    return (
      data.reactions &&
      data.userReactions && (
        <ModelReaction
          active={active}
          setActive={setActive}
          dataReactions={data.reactions}
          dataUserReactions={data.userReactions}
        />
      )
    );
  }
};

export default ModelReactionWrapper;
