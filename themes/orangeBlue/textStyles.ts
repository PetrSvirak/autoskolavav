import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/800.css";
import "@fontsource/roboto-slab/300.css";
import "@fontsource/dm-serif-display/400.css";

export const fontWeights = {
  "bold-link": 400,
  "bold-heading": 400,
  "bold-text": 400,

  "normal-text": 300,
  "normal-link": 300,
};

export const textStyles = {
  discounts: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "bold-text",
    fontSize: "20px",
    textColor: "complement-primary",
  },
  "logo-head": {
    fontFamily: "DM Serif Display, serif",
    fontWeight: "bold-heading",
    fontSize: "72px",
    textColor: "primary",
  },
  "logo-tail": {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 300,
    fontSize: "18px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    textColor: "complement-secondary",
  },
  "logo-preview": {
    fontFamily: "DM Serif Display, serif",
    fontWeight: 600,
    fontSize: "32px",
    textColor: "secondary",
  },
  menu: {
    fontFamily: "DM Serif Display, serif",
    fontWeight: "bold-heading",
    fontSize: "20px",
    textColor: "complement-secondary",
  },
  news: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "bold-text",
    fontSize: "18px",
    textColor: "complement-secondary",
  },
  text: {
    fontFamily: "Roboto Slab, serif",
    fontWeight: "normal-text",
    fontSize: "16px",
    textColor: "complement-secondary",
  },
};
