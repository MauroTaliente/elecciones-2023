import plugin from 'tailwindcss/plugin';

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
     extend: {
      colors: {
        '135': '#704c9f',
        '134': '#00c0ff',
        '132': '#f04bae',
      },
      fontFamily: {
        heading: ['var(--font-Heading)'],
        block: ['var(--font-block)'],
      }
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      // here is your CSS selector - could be anything
      // in this case it is `.theme` element
      // with `.theme--red` class (both present)
      addVariant('clean', '.clean &');
      addVariant('card', '.card &');
      addVariant('loading', '.loading &');
      addVariant('disabled', '.disabled &');
      addVariant('positive', '.positive &');
      addVariant('negative', '.negative &');
    }),
    plugin(({ addComponents, theme }) => {
      // theme props
      // const colors = theme('colors');
      const fontFamily = theme('fontFamily');
      // commons
      const hx = {
        fontFamily: fontFamily.heading,
        lineHeight: 'normal',
        fontWeight: 500,
      };
      const bx = {
        fontFamily: fontFamily.block,
        lineHeight: '140%',
        fontWeight: 400,
      };
      // components
      addComponents({
        ['h1, .h1']: {
          ...hx,
          fontSize: '3.875rem',
        },
        ['h2, .h2']: {
          ...hx,
          fontSize: '3.000rem',
        },
        ['h3, .h3']: {
          ...hx,
          fontSize: '2.440rem',
        },
        ['h4, .h4']: {
          ...hx,
          fontSize: '1.950rem',
        },
        ['h5, .h5']: {
          ...hx,
          fontSize: '1.500rem',
        },
        ['h6, .h6']: {
          ...hx,
          fontSize: '1.250rem',
        },
        ['p, .p']: {
          ...bx,
          fontSize: '1.000rem',
        },
        ['input, .input']: {
          ...bx,
          fontSize: '1.000rem',
        },
        ['small, .small']: {
          ...bx,
          fontSize: '0.800rem',
        },
        ['span, .span']: {
          ...bx,
          letterSpacing: '0.1125rem',
          textTransform: 'uppercase',
          fontSize: '0.640rem',
        },
        ['a, .a']: {
          ...bx,
          fontSize: '1.000em',
          cursor: 'pointer',
          textDecoration: 'underline',
        }
      });
    }),
  ],
};
