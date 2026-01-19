import { DarkmodeContextProvider } from '@/contexts/DarkmodeProvider';
import AppRouter from '@/routes';

const App = () => <DarkmodeContextProvider>
    <AppRouter />
</DarkmodeContextProvider>;

export default App;
