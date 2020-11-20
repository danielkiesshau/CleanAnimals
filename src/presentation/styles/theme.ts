import { createContext } from 'react';

const themes = {
  light: {
    primary: '#F21D1D',
    lightPrimary: '#F21D1D80',
    secondary: '#737373',
    white1: '#FFFFFF',
    white2: '#FCFCFD',
    white3: '#F2F2F2',
    black: '#121212',
    gray1: '#3C3C4399',
    gray2: '#0D0D0DC3',
    gray3: '#A8A8A8',
    gray4: '#1212124D',
    shadow: '#1212122E',
  },
  dark: {
    primary: '#F21D1D',
    lightPrimary: '#F21D1D80',
    secondary: '#222222',
    white1: '#222222',
    white2: '#333333',
    white3: '#444444',
    black: '#FCFCFC',
    gray1: '#A8A8A8',
    gray2: '#BBBBBB',
    gray3: '#BBBBBB',
    gray4: '#A8A8A8',
    shadow: '#1212122E',
  },
};

export default createContext<ContextTheme>({
  themePalette: themes,
  toggleLightMode: () => {},
  isLightMode: true,
});

export interface ContextTheme {
  themePalette: IColors;
  toggleLightMode: Function;
  isLightMode: boolean;
}

export type IColors = typeof themes.light;

export enum EColors {
  primary = 'primary',
  lightPrimary = 'lightPrimary',
  secondary = 'secondary',
  white1 = 'white1',
  white2 = 'white2',
  black = 'black',
  gray1 = 'gray1',
  gray2 = 'gray2',
  gray3 = 'gray3',
  shadow = 'shadow',
}
