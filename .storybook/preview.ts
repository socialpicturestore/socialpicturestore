import type { Preview } from '@storybook/react'
import '../src/shared/styles/index.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0D0D0DFF' }, // твой тёмный фон
        { name: 'light', value: '#FFFFFF' }, // можно добавить ещё светлый
      ],
    },
  },
}

export default preview
