import { createContext } from 'react';

const themes = {
  light: {
    primary: '#F21D1D',
    lightPrimary: '#F21D1D80',
    secondary: '#737373',
    white1: '#FFFFFF',
    white2: '#FCFCFD',
    white3: '#F2F2F2',
    black: '#000000',
    gray1: '#3C3C4399',
    gray2: '#0D0D0DC3',
    gray3: '#A8A8A8',
    gray4: '#0000004D',
    statusColors: {
      blue: '#F21D1D80',
    },
    shadow: '#0000002E',
  },
};
export default createContext(themes);
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
  statusColors = 'statusColors',
  shadow = 'shadow',
}
