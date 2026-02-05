import { useContext } from 'react';

import ConversationFilter from '@/components/ConversationFilter';
import LanguageContext from '@/contexts/LanguageContext';

interface Props {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const ConversationTabFilter = ({ active, setActive }: Props) => {
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <div className="flex items-center px-4.5 py-2">
      <div className="flex h-9 items-center gap-1">
        <ConversationFilter
          active={active === translate(language, 'all')}
          setActive={setActive}
          text={translate(language, 'all')}
        />
        <ConversationFilter
          active={active === translate(language, 'unread')}
          setActive={setActive}
          text={translate(language, 'unread')}
        />
        <ConversationFilter
          active={active === translate(language, 'group')}
          setActive={setActive}
          text={translate(language, 'group')}
        />
      </div>
    </div>
  );
};

export default ConversationTabFilter;
