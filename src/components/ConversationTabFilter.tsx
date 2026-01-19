import ConversationFilter from '@/components/ConversationFilter';

interface Props {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const ConversationTabFilter = ({ active, setActive }: Props) => (
  <div className="flex items-center px-4.5 py-2">
    <div className="flex h-9 items-center gap-1">
      <ConversationFilter
        active={active === 'All'}
        setActive={setActive}
        text="All"
      />
      <ConversationFilter
        active={active === 'Unread'}
        setActive={setActive}
        text="Unread"
      />
      <ConversationFilter
        active={active === 'Group'}
        setActive={setActive}
        text="Group"
      />
    </div>
  </div>
);

export default ConversationTabFilter;
