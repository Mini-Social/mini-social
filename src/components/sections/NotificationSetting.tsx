import { useContext, useState } from 'react';

import LanguageContext from '@/contexts/LanguageContext';

const NotificationSetting = () => {
  const [noti, setNoti] = useState({
    email: true,
    push: false,
  });
  const languageContext = useContext(LanguageContext);
      if (!languageContext) {
        return null;
      }
  const { language, translate } = languageContext;
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{translate(language, 'notification')}</h3>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={noti.email}
          onChange={e =>
            setNoti({
              ...noti,
              email: e.target.checked,
            })
          }
        />
        {translate(language, 'notificationReceive')}
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={noti.push}
          onChange={e =>
            setNoti({
              ...noti,
              push: e.target.checked,
            })
          }
        />
        {translate(language, 'notificationPush')}
      </label>
    </div>
  );
};

export default NotificationSetting;
