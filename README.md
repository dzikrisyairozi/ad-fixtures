# AD Fixtures Website

A multilingual website built with Next.js, featuring smooth animations, internationalization, and a modern UI design.

## Technical Specifications

- Node.js (v18 or higher)
- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- next-intl for internationalization
- Mailjet for email services
- Cloudinary for image hosting
- React 18
- Zustand for state management

## Prerequisites

Before running this project, ensure you have:

1. Node.js installed (v18 or higher)
2. `pnpm` installed
3. A Mailjet account for email services
4. A Cloudinary account for image hosting

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_API_SECRET=your_mailjet_secret
MAILJET_SENDER_EMAIL=your_email@example.com
MAILJET_SENDER_NAME=Your Name
MAILJET_RECIPIENT_EMAIL=recipient_email@example.com
MAILJET_RECIPIENT_NAME=Recipient Name
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ad-fixtures
```


2. Install dependencies:
```bash
pnpm install
```

## Development

Run the development server:

```bash
pnpm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── messages/ # Internationalization message files
│ ├── en.json # English translations
│ ├── ja.json # Japanese translations
│ └── zh.json # Chinese translations
├── src/
│ ├── components/ # Reusable components
│ │ ├── layout/ # Layout components
│ │ └── ui/ # UI components
│ ├── pages/ # Next.js pages
│ │ ├── api/ # API routes
│ │ └── landing/ # Landing page sections
│ ├── lib/ # Utility functions
│ └── styles/ # Global styles
├── public/ # Static files
│ └── images/ # Image assets
└── next.config.mjs # Next.js configuration
```


## Features

### 1. Internationalization
- Supports English, Japanese, and Chinese
- Language switching with URL-based routing
- Middleware-based locale detection
- Separate message files for each language
- SEO-friendly URL structure

### 2. Animations
- Smooth page transitions using Framer Motion
- Scroll-based animations
- Interactive UI elements
- Staggered animations for list items
- Image carousel transitions

### 3. Contact Form
- Email submission through Mailjet
- Form validation
- Success/error notifications
- Rate limiting
- Spam protection

### 4. Image Optimization
- Cloudinary integration for image hosting
- Next.js Image component optimization
- Responsive images across devices
- Lazy loading
- Blur placeholder support

### 5. Performance
- Server-side rendering
- Static page generation where applicable
- Optimized font loading
- Code splitting
- Dynamic imports

## Building for Production

1. Build the project:
```bash
pnpm run build
```

2. Start the production server:
```bash
pnpm run start
```

## Deployment

The project is optimized for deployment on Vercel. To deploy:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard:
   - MAILJET_API_KEY
   - MAILJET_API_SECRET
4. Deploy

## Development Guidelines

### Adding New Languages

1. Create a new translation file in `messages/` directory
2. Add the locale to supported languages in `middleware.ts`:

```typescript
export default createMiddleware({
    locales: ['en', 'ja', 'zh', 'new-locale'],
    defaultLocale: 'en'
});
```

3. Add flag image in `public/images/flags/`
4. Update LocaleSwitcher component

### Adding New Sections

1. Create component in `src/pages/landing/sections/`
2. Add translations to all language files
3. Import and add component to `index.page.tsx`
4. Add any required images to Cloudinary
5. Update types if necessary

### Code Style

- Use TypeScript for all new files
- Follow existing component structure
- Use Tailwind CSS for styling
- Implement responsive design
- Add proper TypeScript types
- Use next-intl for all text content

### Performance Considerations

- Optimize images before uploading to Cloudinary
- Use proper image sizes and formats
- Implement lazy loading where appropriate
- Keep bundle size in check
- Use dynamic imports for large components

## Available Scripts
```bash
pnpm run dev # Start development server
pnpm run build # Build for production
pnpm run start # Start production server
pnpm run lint # Run ESLint
```


## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Troubleshooting

### Common Issues

1. Image loading issues:
   - Check Cloudinary configuration
   - Verify image paths
   - Check image formats

2. Translation issues:
   - Verify message files
   - Check locale configuration
   - Clear browser cache

3. Build errors:
   - Clear `.next` directory
   - Remove `node_modules` and reinstall
   - Check TypeScript errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Support

For support, please contact the development team or create an issue in the repository.