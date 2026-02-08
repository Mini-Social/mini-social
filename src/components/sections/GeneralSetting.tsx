import { useState, useContext } from 'react';

import LanguageContext from '@/contexts/LanguageContext';
import type { Language } from '@/language/language';

const GeneralSetting = () => {
  const languageContext = useContext(LanguageContext);
  const [form, setForm] = useState<{ language: Language }>({
    language: languageContext?.language || 'vi',
  });
  if (!languageContext) {
    return null;
  }
  const { language, switchLanguage, translate } = languageContext;
  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      language: e.target.value as Language,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchLanguage(form.language);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold">
        {translate(language, 'general')}
      </h3>

      <div>
        <span className="mb-1 block text-sm">
          {translate(language, 'language')}
        </span>
        <select
          className="bg-background w-full rounded border px-3 py-2"
          onChange={handleChangeLanguage}
          defaultValue={language}
        >
          <option value="vi">{translate(language, 'vietnamese')}</option>
          <option value="en">English</option>
        </select>
      </div>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked />
        {translate(language, 'autoPlayVideo')}
      </label>

      <button className="rounded bg-blue-500! px-4 py-2 text-white">
        {translate(language, 'save')}{' '}
        {translate(language, 'change').toLowerCase()}
      </button>
    </form>
  );
};

export default GeneralSetting;
