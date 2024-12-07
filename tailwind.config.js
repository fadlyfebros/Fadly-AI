import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  // Tentukan file yang akan di-scan untuk class Tailwind
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // Konfigurasi tema
  theme: {
    extend: {
      // Tambahkan warna kustom
      colors: {
        brand: {
          light: "#4ade80", // Warna hijau terang
          DEFAULT: "#22c55e", // Warna hijau utama
          dark: "#166534", // Warna hijau gelap
        },
      },
      // Tambahkan font keluarga
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["Fira Code", "ui-monospace", "SFMono-Regular"],
      },
      // Tambahkan animasi kustom
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "bounce-slow": "bounce 2s infinite",
      },
      // Keyframes untuk animasi fade-in
      keyframes: {
        "fade-in": {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },

  // Plugin DaisyUI
  plugins: [daisyui],

  // Konfigurasi DaisyUI
  daisyui: {
    themes: [
      "light", // Tema default
      "dark", // Tema gelap
      {
        fadlytheme: {
          primary: "#3b82f6", // Biru untuk elemen utama
          secondary: "#9333ea", // Ungu untuk elemen sekunder
          accent: "#22c55e", // Hijau sebagai aksen
          neutral: "#1f2937", // Abu-abu untuk elemen netral
          "base-100": "#ffffff", // Warna latar belakang utama
          info: "#3abff8", // Biru untuk elemen info
          success: "#36d399", // Hijau untuk elemen sukses
          warning: "#fbbd23", // Kuning untuk elemen peringatan
          error: "#f87272", // Merah untuk elemen error
        },
      },
    ],
  },
};