import { useText, changeLanguage } from './i18n';
import Signal from '../electron/Signal';
import { channel } from '@/channel';

export function App() {
  const t = useText();

  const cl = (lng: Parameters<typeof changeLanguage>[0]) => {
    changeLanguage(lng);
    channel.send(Signal.LanguageChanged, lng);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="font-bold text-2xl text-amber-950 mb-6">{t('hello')}</h1>
      <div className="flex gap-4">
        <button
          onClick={() => cl('en')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {t('english')}
        </button>
        <button
          onClick={() => cl('zh')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          {t('chinese')}
        </button>
      </div>
    </div>
  );
}
