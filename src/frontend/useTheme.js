import { useState } from 'react';

export const darkTheme = {
  fg: 'white',
  bg: 'black',
};

export const lightTheme = {
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
