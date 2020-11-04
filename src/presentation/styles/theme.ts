import { createContext } from 'react'

const themes = {
  light: {
    primary: '#F21D1D',
    lightPrimary: '#F21D1D80',
    secondary: '#737373',
    white1: '#FFFFFF',
    white2: '#FCFCFD',
    black: '#000000',
    gray1: '#3C3C4399',
    gray2: '#A8A8A8',
    gray3: '#0000004D',
    statusColors: {
      blue: '#F21D1D80'
    }
  }
}
const contextTheme = createContext(themes)
export default contextTheme
export type ITheme = typeof themes
