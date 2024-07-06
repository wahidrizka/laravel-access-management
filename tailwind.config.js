import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: [
                    "Mona Sans",
                    "Mona Sans Header Fallback",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Helvetica",
                    "Arial",
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    ...defaultTheme.fontFamily.sans,
                ],
            },
        },
    },

    plugins: [
        nextui({
            themes: {
                light: {
                    colors: {},
                },
            },
        }),
    ],
};
