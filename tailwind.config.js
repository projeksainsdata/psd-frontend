import { createThemes } from 'tw-colors';
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {

        fontSize: {
            'sm': '12px',
            'base': '14px',
            'xl': '16px',
            '2xl': '20px',
            '3xl': '28px',
            '4xl': '38px',
            '5xl': '50px',
        },

        extend: {
            fontFamily: {
              inter: ["'Inter'", "sans-serif"],
              gelasio: ["'Gelasio'", "serif"],
              monospace: ["Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace"],
              linearsans: ["linearsans", ...defaultTheme.fontFamily.sans]
            },
            colors: {
                'purple-pink-gradient': 'linear-gradient(to right, #805AD5, #FA709A)',
                'green-blue-gradient': 'linear-gradient(to right, #00C9A7, #00B4D8)',
                'yellow-red-gradient': 'linear-gradient(to right, #FCE38A, #F38181)',
                'teal-cyan-gradient': 'linear-gradient(to right, #17EAD9, #6078EA)',
                'orange-pink-gradient': 'linear-gradient(to right, #FAD961, #F76B1C)',
                'purple-indigo-gradient': 'linear-gradient(to right, #5D26C1, #A17FE0)',
                'green-teal-gradient': 'linear-gradient(to right, #11998E, #38EF7D)',
                'blue-purple-gradient': 'linear-gradient(to right, #0575E6, #021B79)',
                'pink-red-gradient': 'linear-gradient(to right, #FF416C, #FF4B2B)',
                'yellow-green-gradient': 'linear-gradient(to right, #F8FF00, #3AD59F)'
            }
        },

    },
    plugins: [
        createThemes({
            light: {
                'white': '#F5F5F5',
                'black': '#1A202C',
                'dark-blue': '#403279',
                'light-green': '#4476B9',
                'grey': '#CBD5E0',
                'dark-grey': '#4A5568',
                'red': '#E53E3E',
                'transparent': 'transparent',
                'twitter': '#1DA1F2',
                'purple': '#805AD5',
                'dark-red': '#8B0000',
                'pink':'#FF91D5',
                'ungu':'#403178',
                'discord': '#7289da',
                'apps' : '#2CBCAB'
            },
            dark: {
                'white': '#2D3748',
                'black': '#F7FAFC',
                'grey': '#4A5568',
                'dark-grey': '#CBD5E0',
                'dark-blue': '#403279',
                'light-green': '#2CBCAB',
                'red': '#E53E3E',
                'transparent': 'transparent',
                'twitter': '#0E71A8',
                'purple': '#6B46C1',
                'dark-red': '#8B0000',
                'pink':'#FF91D5',
                'ungu':'#403178',
                'discord': '#7289da',
                'apps' : '#4476B9'
            } 
        })
    ],
};