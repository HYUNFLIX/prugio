/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        green: {
          deepest:  '#112d22',
          deep:     '#13362d',
          forest:   '#154734',
          primary:  '#1b493c',
          medium:   '#1e5041',
          popup:    '#005b4a',
          light:    '#2d7a5f',
        },
        gold: {
          light:  '#e8d59a',
          DEFAULT: '#d6b46b',
          dark:   '#b8943a',
        },
        brown: {
          unit:   '#6d5b51',
          badge:  '#5d5045',
          medium: '#8a7060',
        },
        dark: {
          footer: '#222222',
          nav:    '#1a1a1a',
        }
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'Pretendard Variable', 'sans-serif'],
        pretendard: ['Pretendard Variable', 'Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
