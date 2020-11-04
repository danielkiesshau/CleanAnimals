import { createContext } from 'react'

const fonts = {
  h1: {
    fontSize: 17,
    fontWeight: '500'
  },
  h2: {
    fontSize: 17,
    fontWieght: '300'
  },
  t1: {
    fontSize: 12,
    fontWeight: '400'
  },
  t2: {
    fontSize: 12,
    fontWeight: '100'
  }
}

export default createContext(fonts)
