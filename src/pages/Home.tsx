import Posts from '@/components/Posts';
import Share from '@/components/Share';
import Stories from '@/components/Stories';

const Home = () => (
  <>
    <div className="flex-6 shrink-0">
      <div className="px-17.5 py-5">
        <Stories />
        <Share />
        <Posts />
      </div>
    </div>
  </>
);

export default Home;
