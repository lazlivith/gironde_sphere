/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#687a64", // Sage Green Assombri (WCAG AA > 4.5:1 avec texte blanc)
        "primary-light": "#8A9A86", // L'ancien primary utilisé comme hover/light
        ink: "#1A1A1A", // Noir Anthracite
        muted: "#9E9E9E",
        surface: "#F5EFEB", // Warm Cream
        cream: "#F5EFEB", 
        promo: "#E53E3E", // Rouge Promo
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(15px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        pop: {
          "0%": { transform: "scale(0.95)" },
          "40%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease-out forwards",
        "slide-up": "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pop": "pop 0.3s ease-in-out",
        "shimmer": "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};
