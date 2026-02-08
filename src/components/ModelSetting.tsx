import CloseIcon from '@mui/icons-material/Close';
import React, {
  useContext,
  useEffect,
  useState,
  type SetStateAction,
} from 'react';

import AccountSetting from './sections/AccountSetting';
import AppearanceSetting from './sections/AppearanceSetting';
import GeneralSetting from './sections/GeneralSetting';
import NotificationSetting from './sections/NotificationSetting';
import SecuritySetting from './sections/SecuritySetting';
import { SETTING_TAB, SETTING_TABS, type SettingTab } from './sections/tab';
import LanguageContext from '@/contexts/LanguageContext';
import type { translations } from '@/language/language';

interface Props {
  setIsOpen: React.Dispatch<SetStateAction<string>>;
}

const ModelSetting = ({ setIsOpen }: Props) => {
  const [activeTab, setActiveTab] = useState<SettingTab>(
    () =>
      (localStorage.getItem('setting_tab') as SettingTab) ||
      SETTING_TAB.GENERAL,
  );

  useEffect(() => {
    localStorage.setItem('setting_tab', activeTab);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case SETTING_TAB.GENERAL:
        return <GeneralSetting />;
      case SETTING_TAB.SECURITY:
        return <SecuritySetting setIsOpen={setIsOpen} />;
      case SETTING_TAB.NOTIFICATION:
        return <NotificationSetting />;
      case SETTING_TAB.APPEARANCE:
        return <AppearanceSetting />;
      case SETTING_TAB.ACCOUNT:
        return <AccountSetting />;
      default:
        return null;
    }
  };
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40">
      <div className="bg-background absolute flex h-full w-full flex-col overflow-hidden md:h-[80vh] md:w-[900px] md:rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3 text-lg font-semibold">
          {translate(language, 'setting')}
          <div
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[50%] bg-(--closeColor) hover:opacity-80"
            onClick={() => setIsOpen('')}
          >
            <CloseIcon fontSize="small" className="cursor-pointer" />
          </div>
        </div>
        {/* Mobile select */}
        <div className="border-b p-3 md:hidden">
          <select
            value={activeTab}
            onChange={e => setActiveTab(e.target.value as SettingTab)}
            className="bg-background w-full rounded border px-3 py-2"
          >
            {SETTING_TABS.map(tab => (
              <option key={tab.value} value={tab.value}>
                {translate(language, tab.label as keyof typeof translations.vi)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop sidebar */}
          <div className="hidden w-56 border-r md:block">
            {SETTING_TABS.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`bg-background! w-full border-none! px-4 py-2 text-left text-sm ${
                  activeTab === tab.value
                    ? 'bg-background! font-medium! text-blue-600!'
                    : 'text-(--textColor2) hover:bg-gray-100'
                } `}
              >
                {translate(language, tab.label as keyof typeof translations.vi)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelSetting;
