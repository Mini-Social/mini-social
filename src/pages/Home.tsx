import { useState } from 'react';

import ModelMessage from '@/components/ModelMessage';
import Posts from '@/components/Posts';
import Share from '@/components/Share';
import Stories from '@/components/Stories';

const Home = () => {
  const [openModelMessage, setOpenModelMessage] = useState<boolean>(true);

  return (
    <>
      <div className="xl:flex-6 min-w-0 md:flex-5">
        <div className="xl:px-17.5 xl:py-5 lg:px-5 lg:py-2.5 md:px-5 py-2.5">
          <Stories />
          <Share />
          <Posts />
        </div>
      </div>
      {openModelMessage && (
        <ModelMessage setOpenModelMessage={setOpenModelMessage} />
      )}
    </>
  );
};

export default Home;
