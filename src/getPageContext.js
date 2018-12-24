/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import { lightBlue, lightGreen, red, blueGrey, green, teal, cyan, lime } from '@material-ui/core/colors';

// A theme with custom primary and secondary color.
// It's optional.
const customBlue = {
  50: '#B5CBD7', // font and borders for dark
  100: '#97B6C8',
  200: '#89ACC0', 
  300: '#7AA1B8', // offset colors
  400: '#6B97B0',
  500: '#5D8DA9', // buttons and accents
  600: '#55819A',
  700: '#4D748B', 
  800: '#44677B', // emphasize
  900: '#3C5A6C',
  A100: '#179fce',
  A200: '#2f7292',
  A400: '#2f5978',
  A700: '#2e475e',
  contrastDefaultColor: 'light',
};

const theme = createMuiTheme({
  palette: {
    primary: customBlue,
    secondary: teal,
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
