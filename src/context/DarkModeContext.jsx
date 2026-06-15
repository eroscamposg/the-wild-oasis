import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error('useDarkMode must be used within DarkModeProvider');

  return context;
}

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');

  function toggleDarkMode() {
    setIsDarkMode(isDark => !isDark);
  }

  useEffect(() => {
    const rootClasses = document.documentElement.classList;
    if (isDarkMode) {
      rootClasses.add('dark-mode');
      rootClasses.remove('light-mode');
    } else {
      rootClasses.add('light-mode');
      rootClasses.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDarkMode };
