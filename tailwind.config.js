
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // New color palette
        black: {
          950: '#000000',
          900: '#0B0B0B',
          800: '#141414'
        },
        redmetal: {
          800: '#3B0000',
          600: '#580404',
          400: '#8E0D0D'
        },
        silver: {
          600: '#757575',
          300: '#BFBFBF',
          100: '#F4F4F4'
        },
        dashboard: {
          primary: '#02effe',
          secondary: '#005fea',
          accent: '#4cacfe',
          muted: '#F7FAFF',
          border: '#aee1f9',
          heading: '#005fea'
        },
        nxt: {
          red: '#c01c1c',
          darkRed: '#a51919',
          lightRed: '#d63031',
          gray: '#333333',
          darkGray: '#1a1a1a',
          lightGray: '#f5f5f5'
        },
      },
      backgroundImage: {
        'metal-primary': 'var(--grad-metal-primary)',
        'silver-flare': 'var(--grad-silver-flare)',
      },
      blur: {
        18: '18px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        'pulse-neon': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 10px rgba(1,95,234,0.7), 0 0 20px rgba(1,95,234,0.5), 0 0 30px rgba(1,95,234,0.3)' 
          },
          '50%': { 
            opacity: '0.6',
            boxShadow: '0 0 5px rgba(1,95,234,0.5), 0 0 10px rgba(1,95,234,0.3)' 
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-neon": "pulse-neon 2s infinite"
      },
      perspective: {
        '800': '800px',
        '1000': '1000px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addComponents }) {
      addComponents({
        '.frosted-card': {
          '@apply relative rounded-3xl p-6 text-silver-100/90': {},
          background: 'rgba(59,0,0,0.55)',
          backdropFilter: 'blur(18px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 2px 24px rgba(0,0,0,0.55)',
        },
        '.glossy-overlay': {
          '@apply absolute inset-0 rounded-3xl pointer-events-none': {},
          background: 'var(--grad-silver-flare)',
          mixBlendMode: 'screen',
        },
      });
    }
  ],
}
