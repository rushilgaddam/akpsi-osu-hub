export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "blob-one": "blob-one 8s infinite",
        "blob-two": "blob-two 7s infinite",
        "blob-three": "blob-three 9s infinite",
        "blob-four": "blob-four 6s infinite",
        "blob-five": "blob-five 8.5s infinite",
        "spin-slow": "spin 8s linear infinite",
        "spin-reverse": "spin-reverse 10s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "float-delayed": "float 3s ease-in-out infinite 1.5s",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "blob-one": {
          "0%, 100%": { transform: "translate(-20%, -20%) scale(1)" },
          "25%": { transform: "translate(-10%, -30%) scale(1.05)" },
          "50%": { transform: "translate(-30%, -10%) scale(0.95)" },
          "75%": { transform: "translate(-25%, -25%) scale(1.02)" },
        },
        "blob-two": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "25%": { transform: "translate(-10%, 10%) scale(1.02)" },
          "50%": { transform: "translate(10%, -10%) scale(0.98)" },
          "75%": { transform: "translate(5%, 5%) scale(1.01)" },
        },
        "blob-three": {
          "0%, 100%": { transform: "translate(10%, 20%) scale(1)" },
          "25%": { transform: "translate(20%, 10%) scale(0.98)" },
          "50%": { transform: "translate(0%, 30%) scale(1.03)" },
          "75%": { transform: "translate(15%, 25%) scale(0.99)" },
        },
        "blob-four": {
          "0%, 100%": { transform: "translate(-10%, 10%) scale(1)" },
          "25%": { transform: "translate(0%, 0%) scale(1.01)" },
          "50%": { transform: "translate(-20%, 20%) scale(0.97)" },
          "75%": { transform: "translate(-15%, 15%) scale(1.02)" },
        },
        "blob-five": {
          "0%, 100%": { transform: "translate(20%, -10%) scale(1)" },
          "25%": { transform: "translate(15%, 0%) scale(1.02)" },
          "50%": { transform: "translate(25%, -20%) scale(0.98)" },
          "75%": { transform: "translate(20%, -15%) scale(1.01)" },
        },
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
