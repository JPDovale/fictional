const { colors } = require('./src/renderer/styles/colors')

module.exports = {
  content: ['./src/**/*.{ts,tsx,ejs}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        ...colors,
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'square-spin': {
          '25%': { transform: 'perspective(100px) rotateX(180deg) rotateY(0)' },
          '50%': {
            transform: 'perspective(100px) rotateX(180deg) rotateY(180deg)',
          },
          '75%': { transform: 'perspective(100px) rotateX(0) rotateY(180deg)' },
          '100%': { transform: 'perspective(100px) rotateX(0) rotateY(0)' },
        },
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'square-spin':
          'square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite',
        overlayShow: 'overlayShow 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        default:
          '4px 4px 8px rgba(0, 0, 0, 0.5), -2px -2px 3px rgba(255, 255, 255)',
        defaultDark:
          '4px 4px 8px rgba(0, 0, 0, 0.5), -1px -1px 2px rgba(200, 200, 200, 0.3)',
        onActive:
          'inset 4px 4px 8px rgba(0, 0, 0, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.5)',
        inFocus: '0 0 6px 3px #2A0B53',
        inFocusDark: '0 0 6px 3px #6F3BDD',
        purpleShadow: '0 0 120px 20px',
      },
      fontFamily: {
        title: 'Cinzel_Decorative',
        subtitle: 'Cinzel',
        body: 'Roboto',
        heading: 'Uncial_Antiqua',
      },
      fontSize: {
        xxs: '0.625rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
