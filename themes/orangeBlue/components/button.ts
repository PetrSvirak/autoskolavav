export const Button = {
  baseStyle: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 600,
    fontSize: "18px",
    borderWidth: "2px",
  },
  variants: {
    primary: {
      background: "complement-primary",
      color: "primary",
      borderColor: "primary",
      _hover: {
        background: "highlight-primary",
      },
    },
    secondary: {
      background: "secondary",
      color: "complement-primary",
      borderColor: "complement-primary",
      _hover: {
        background: "highlight-secondary",
      },
    },
    ternary: {
      background: "complement-primary",
      color: "secondary",
      borderColor: "complement-primary",
      _hover: {
        background: "highlight-secondary",
      },
    },
  },
  defaultProps: {
    variant: "primary",
  },
};
