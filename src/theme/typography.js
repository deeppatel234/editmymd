// default font size for app
const HtmlFontSize = 16;
const FontFamily = "'Montserrat', sans-serif";

// pixel to rem converter
const pxToRem = size => `${size / HtmlFontSize}rem`;

// font weight
const FontWeight = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  BOLD: 700,
};

export default {
  pxToRem,
  HtmlFontSize,
  h1: {
    fontSize: pxToRem(96),
    lineHeight: 1,
    fontWeight: FontWeight.LIGHT,
  },
  h2: {
    fontSize: pxToRem(60),
    lineHeight: 1,
    fontWeight: FontWeight.LIGHT,
  },
  h3: {
    fontSize: pxToRem(48),
    lineHeight: 1.04,
    fontWeight: FontWeight.REGULAR,
  },
  h4: {
    fontSize: pxToRem(34),
    lineHeight: 1.17,
    fontWeight: FontWeight.REGULAR,
  },
  h5: {
    fontSize: pxToRem(24),
    lineHeight: 1.33,
    fontWeight: FontWeight.REGULAR,
  },
  h6: {
    fontSize: pxToRem(20),
    lineHeight: 1.6,
    fontWeight: FontWeight.MEDIUM,
  },
  button: {
    fontSize: pxToRem(14),
    lineHeight: 1.75,
    fontWeight: FontWeight.REGULAR,
    fontFamily: FontFamily,
  },
  body: {
    fontSize: pxToRem(16),
    lineHeight: 1.5,
    fontWeight: FontWeight.REGULAR,
    fontFamily: FontFamily,
  },
  subBody: {
    fontSize: pxToRem(14),
    lineHeight: 1.43,
    fontWeight: FontWeight.REGULAR,
  },
  label: {
    fontSize: pxToRem(12),
    fontWeight: FontWeight.BOLD,
  },
  helpText: {
    fontSize: pxToRem(10),
    fontWeight: FontWeight.REGULAR,
  },
};
