export const SETTING_TAB = {
  GENERAL: 'general',
  SECURITY: 'security',
  NOTIFICATION: 'notification',
  APPEARANCE: 'appearance',
  ACCOUNT: 'account',
} as const;

export const SETTING_TABS = [
  {
    label: 'general',
    value: SETTING_TAB.GENERAL,
  },
  {
    label: 'security',
    value: SETTING_TAB.SECURITY,
  },
  {
    label: 'notification',
    value: SETTING_TAB.NOTIFICATION,
  },
  {
    label: 'appearance',
    value: SETTING_TAB.APPEARANCE,
  },
  {
    label: 'account',
    value: SETTING_TAB.ACCOUNT,
  },
];
export type SettingTab = (typeof SETTING_TAB)[keyof typeof SETTING_TAB];
