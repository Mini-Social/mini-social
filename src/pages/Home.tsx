import { useState } from 'react';

import ModelMessage from '@/components/ModelMessage';
import Posts from '@/components/Posts';
import Share from '@/components/Share';
import Stories from '@/components/Stories';

const Home = () => {
  const [openModelMessage, setOpenModelMessage] = useState<boolean>(true);

  return  <>
    <div className="flex-6 shrink-0">
      <div className="px-17.5 py-5">
        <Stories />
        <Share />
        <Posts />
      </div>
    </div>
    {openModelMessage && <ModelMessage setOpenModelMessage={setOpenModelMessage} />}
  </>
}

export default Home;
