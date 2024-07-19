import { useState, useEffect } from 'react';
import './theme-switch.styles.scss';

const ThemeSwitch = () => {
  const prefersDarkMode = () => {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  };
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode());

  useEffect(() => {
    initializeTheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setThemeBasedOnPreferences();
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setThemeBasedOnPreferences = () => {
    const isDarkMode = prefersDarkMode();
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light'
    );
    setIsDarkMode(isDarkMode);
  };

  const updateThemeIcon = (isDarkMode: boolean) => {
    return isDarkMode ? 'fa-moon' : 'fa-sun';
  };

  const switchTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setIsDarkMode(newTheme === 'dark');
  };

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setThemeBasedOnPreferences();
    }
  };

  return (
    <div className="theme-switch-container" onClick={switchTheme}>
      <i className={`fas ${updateThemeIcon(isDarkMode)}`}></i>
    </div>
  );
};

export default ThemeSwitch;
