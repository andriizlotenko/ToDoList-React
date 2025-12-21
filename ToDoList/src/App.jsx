import AppRouter from './AppRouter';
import { ThemeProvider } from './theme/ThemeProvider';
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
       <AppRouter />
    </ThemeProvider>
  );
}