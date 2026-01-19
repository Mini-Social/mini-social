import { useState } from 'react';

import ModelMessage from '@/components/ModelMessage';
import Posts from '@/components/Posts';
import Share from '@/components/Share';
import Stories from '@/components/Stories';

const Home = () => {
  const [openModelMessage, setOpenModelMessage] = useState<boolean>(true);

  return (
    <>
      <div className="min-w-0 md:flex-5 xl:flex-6">
        <div className="py-2.5 md:px-5 lg:px-5 lg:py-2.5 xl:px-17.5 xl:py-5">
          <Stories />
          <Share />
          <Posts />
        </div>
      </div>
      {openModelMessage && (
        <ModelMessage
          openModelMessage={openModelMessage}
          setOpenModelMessage={setOpenModelMessage}
        />
      )}
    </>
  );
};

export default Home;
