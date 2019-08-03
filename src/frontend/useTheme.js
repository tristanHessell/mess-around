import { useState } from 'react';

const darkTheme = {
  fg: 'white',
  bg: 'black',
};

const lightTheme = {
  fg: 'black',
  bg: 'white',
};

const defaultTheme = {
  name: 'light',
  ...lightTheme,
};

export default function useTheme() {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    const name = theme.name === 'dark' ? 'light' : 'dark';
    const newTheme = name === 'light' ? lightTheme : darkTheme;

    setTheme({
      name,
      ...newTheme,
    });
  };

  return [theme, toggleTheme];
}
