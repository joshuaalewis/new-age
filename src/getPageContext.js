/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import { lightBlue, lightGreen, red, blueGrey, green, teal, cyan, lime } from '@material-ui/core/colors';

// A theme with custom primary and secondary color.
// It's optional.
// const medTraitBlue = {
//   50: '#D0E5F2', // font and borders for dark
//   100: '#A2CBE6',
//   200: '#73B1D9', 
//   300: '#5CA4D3', // offset colors
//   400: '#2E8AC7',
//   500: '#0071BB', // buttons and accents
//   600: '#005D9A',
//   700: '#004877', 
//   800: '#003E66', // emphasis
//   900: '#002A44',
//   A100: '#179fce',
//   A200: '#2f7292',
//   A400: '#2f5978',
//   A700: '#2e475e',
//   contrastDefaultColor: 'light',
// };

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: cyan,
    error: red,
  },
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
