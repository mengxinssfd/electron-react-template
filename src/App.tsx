import { useText, changeLanguage } from './i18n';

export function App() {
  const t = useText();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="font-bold text-2xl text-amber-950 mb-6">{t('hello')}</h1>
      <div className="flex gap-4">
        <button
          onClick={() => changeLanguage('en')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {t('english')}
        </button>
        <button
          onClick={() => changeLanguage('zh')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          {t('chinese')}
        </button>
      </div>
    </div>
  );
}
