import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      900: "#4A2C11",
      700: "#8B3A3A",
      500: "#F0B784",
      300: "#F6D5B4",
      100: "#FFF4CC",
    },
    ink: {
      900: "#1A1A1A",
      700: "#1A0933",
    },
    accent: {
      yellow: "#FFEA00",
      teal: "#00F5D4",
      green: "#00E676",
      red: "#FF1053",
    },
    pastel: {
      green: "#CAFFBF",
      red: "#FFADAD",
    },
  },
  fonts: {
    heading: "'Commissioner', sans-serif",
    body: "'Commissioner', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "brand.300",
        fontFamily: "body",
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        color: "brand.700",
        _hover: {
          color: "brand.500",
          textDecoration: "none",
        },
        _click: {
          outline: "none",
        },
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "500",
        borderRadius: "md",
      },
      variants: {
        primary: {
          bg: "brand.500",
          color: "brand.900",
          borderWidth: "2px",
          borderColor: "ink.900",
          boxShadow: "2px 2px 0px rgba(0,0,0,0.1)",
          _hover: {
            bg: "brand.500",
            transform: "translateY(-1px)",
            boxShadow: "3px 3px 0px rgba(0,0,0,0.15)",
          },
          _active: {
            transform: "translateY(1px)",
            boxShadow: "1px 1px 0px rgba(0,0,0,0.1)",
          },
        },
        check: {
          bg: "accent.yellow",
          color: "ink.900",
          borderWidth: "3px",
          borderColor: "ink.900",
          boxShadow: "2px 2px 0px #1A1A1A",
          _hover: {
            bg: "accent.yellow",
            transform: "translateY(-1px)",
            boxShadow: "3px 3px 0px #1A1A1A",
          },
          _active: {
            transform: "translateY(1px)",
            boxShadow: "1px 1px 0px #1A1A1A",
          },
        },
        success: {
          bg: "accent.green",
          color: "ink.900",
          borderWidth: "2px",
          borderColor: "ink.900",
          boxShadow: "2px 2px 0px #1A1A1A",
          _hover: {
            bg: "accent.green",
            transform: "translateY(-1px)",
            boxShadow: "3px 3px 0px #1A1A1A",
          },
          _active: {
            transform: "translateY(1px)",
            boxShadow: "1px 1px 0px #1A1A1A",
          },
        },
        danger: {
          bg: "accent.red",
          color: "white",
          borderWidth: "2px",
          borderColor: "ink.900",
          boxShadow: "2px 2px 0px #1A1A1A",
          _hover: {
            bg: "accent.red",
            transform: "translateY(-1px)",
            boxShadow: "3px 3px 0px #1A1A1A",
          },
          _active: {
            transform: "translateY(1px)",
            boxShadow: "1px 1px 0px #1A1A1A",
          },
        },
        nav: {
          bg: "brand.100",
          color: "brand.900",
          borderWidth: "2px",
          borderColor: "ink.900",
          boxShadow: "2px 2px 0px #1A1A1A",
          _hover: {
            bg: "brand.100",
            transform: "translateY(-1px)",
            boxShadow: "3px 3px 0px #1A1A1A",
          },
          _active: {
            transform: "translateY(1px)",
            boxShadow: "1px 1px 0px #1A1A1A",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "brand.900",
        fontWeight: "400",
        fontFamily: "heading",
        lineHeight: "120%",
      },
    },
    Text: {
      baseStyle: {
        color: "brand.900",
        lineHeight: "200%",
      },
    },
    FormLabel: {
      baseStyle: {
        color: "brand.900",
        lineHeight: "200%",
      },
    },
    Badge: {
      baseStyle: {
        borderWidth: "1px",
        borderColor: "gray.300",
      },
    },
    Progress: {
      baseStyle: {
        borderRadius: "full",
        bg: "white",
        borderWidth: "1px",
        borderColor: "gray.300",
      },
    },
  },
  shadows: {
    neu: "2px 2px 0px #1A1A1A",
    "neu-lg": "3px 3px 0px #1A1A1A",
    "neu-hover": "3px 3px 0px rgba(0,0,0,0.15)",
  },
});

export default theme;
