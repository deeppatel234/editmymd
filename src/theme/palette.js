import { getContrast } from 'polished';

const COLOR = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  TEXT: 'text',
  SUBTEXT: 'subText',
  LIGHTTEXT: 'lightText',
  DISABLED: 'disabled',
  WHITE: 'white',
  BLACK: 'black',
  DEFAULT: 'default',
  DARK: 'dark',
};

const grey = {
  grey50: '#fafafa',
  grey100: '#f5f5f5',
  grey200: '#eeeeee',
  grey300: '#e0e0e0',
  grey400: '#bdbdbd',
  grey500: '#9e9e9e',
  grey600: '#757575',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#212121',
};

const colors = {
  [COLOR.PRIMARY]: '#04AA51',
  [COLOR.SECONDARY]: '#0caf78',
  [COLOR.SUCCESS]: '#34cc99',
  [COLOR.ERROR]: '#cc3654',
  [COLOR.INFO]: '#4765f1',
  [COLOR.TEXT]: 'rgba(0, 0, 0, 0.87)',
  [COLOR.SUBTEXT]: 'rgba(0, 0, 0, 0.54)',
  [COLOR.LIGHTTEXT]: 'rgba(0, 0, 0, 0.24)',
  [COLOR.DISABLED]: 'rgba(0, 0, 0, 0.38)',
  [COLOR.WHITE]: '#fff',
  [COLOR.BLACK]: '#000',
  [COLOR.DARK]: '#24292E',
};

const contrastText = {
  [colors[COLOR.PRIMARY]]: colors[COLOR.WHITE],
  [colors[COLOR.SECONDARY]]: colors[COLOR.WHITE],
};

const background = {
  body: colors[COLOR.WHITE],
  dark: colors[COLOR.DARK],
};

// https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast
const contrastRatio = 4.5;

const getContrastText = (theme, backgroundColor) => {
  const themeColor = theme.palette.contrastText[backgroundColor];
  if (themeColor) {
    return themeColor;
  }
  return getContrast(backgroundColor, colors[COLOR.WHITE]) >=
    (theme.contrastRatio || contrastRatio)
    ? colors[COLOR.WHITE]
    : colors[COLOR.TEXT];
};

export default {
  ...colors,
  background,
  grey,
  contrastText,
  contrastRatio,
  getContrastText,
};
