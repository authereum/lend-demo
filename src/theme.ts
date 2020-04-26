import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00172B"
    },
    secondary: {
      light: "#A2AAB1",
      main: "#6F7983"
    },
    background: {
      default: "#F70000"
    }
  },
  typography: {
    fontFamily: [
      '"Lato"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '3.2rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '2.8rem',
      fontWeight: 700
    },
    h3: {
      fontSize: '2.2rem',
      fontWeight: 700
    },
    subtitle1: {
      fontSize: '1.4rem',
      fontWeight: 400
    },
    subtitle2: {
      fontSize: '1.4rem',
      fontWeight: 700
    },
    body1: {
      fontSize: '1.6rem',
      fontWeight: 400
    }
  },
  overrides: {
    MuiCard: {
      root: {
        boxShadow: '0 16px 60px -12px rgba(0,0,0,0.15)',
        borderRadius: '0.9rem',
        padding: '3.5rem',
        margin: '3.5rem 0'
      }
    }
  }
})

export default theme