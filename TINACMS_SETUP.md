# TinaCMS Integration Setup Guide

This guide will help you set up TinaCMS for your MBread Coffee & Tea project.

## Overview

TinaCMS has been integrated into your project to provide a visual content management system. You can now edit your menu items, carousel slides, and pages through a visual interface.

## Features Added

- **Menu Items Management**: Edit coffee, tea, pastry, and special items
- **Hero Carousel Management**: Update homepage carousel slides
- **Page Content Management**: Edit static pages
- **Visual Editing**: Edit content directly on your website
- **Git-based**: All changes are stored in your Git repository

## Setup Instructions

### 1. Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# TinaCMS Configuration
NEXT_PUBLIC_TINA_CLIENT_ID=your-tina-client-id-here
TINA_TOKEN=your-tina-token-here
NEXT_PUBLIC_EDIT_BRANCH=main
```

### 2. Get TinaCMS Credentials

1. Go to [TinaCMS Cloud](https://tina.io/)
2. Create a new project or connect your existing repository
3. Get your Client ID and Token from the dashboard
4. Add them to your environment variables

### 3. Content Structure

The following content structure has been created:

```
content/
├── menu/           # Menu items (MDX files)
├── pages/          # Static pages (MDX files)
└── carousel/       # Hero carousel slides (MDX files)

public/
└── uploads/        # Media files
```

### 4. Running TinaCMS

To start the TinaCMS development server:

```bash
npm run tinacms
```

This will start TinaCMS on `http://localhost:4001` (or another available port).

### 5. Accessing the Admin Interface

- **TinaCMS Admin**: Visit `/admin/tina` on your website
- **Visual Editing**: Add `?edit=true` to any page URL to enable visual editing

## Content Models

### Menu Items

Each menu item includes:
- Title (required)
- Description (required)
- Price in VND (required)
- Image (required)
- Category (coffee, tea, pastry, special)
- Is Popular flag
- Ingredients (optional)
- Allergens (optional)

### Hero Carousel

Each carousel slide includes:
- Title (required)
- Subtitle (optional)
- Background image (required)
- Button text (optional)
- Button link (optional)
- Is Active flag

### Pages

Each page includes:
- Title (required)
- Description (optional)
- Hero image (optional)
- Rich text body

## Components

### TinaFeaturedMenu

A TinaCMS-enabled version of the FeaturedMenu component that:
- Fetches menu items from TinaCMS
- Shows loading states
- Falls back gracefully if TinaCMS is unavailable
- Maintains all existing functionality (cart, favorites, sharing)

### TinaHeroCarousel

A TinaCMS-enabled version of the HeroCarousel component that:
- Fetches carousel slides from TinaCMS
- Shows loading states
- Falls back to static slides if TinaCMS is unavailable
- Maintains all existing functionality (navigation, auto-play)

## Usage

### Adding Menu Items

1. Go to TinaCMS admin (`/admin/tina`)
2. Navigate to "Menu Items"
3. Click "Create New"
4. Fill in the required fields
5. Set "Is Popular" to true to show in the featured section
6. Save

### Managing Carousel

1. Go to TinaCMS admin (`/admin/tina`)
2. Navigate to "Hero Carousel"
3. Create or edit slides
4. Set "Is Active" to true to show in the carousel
5. Save

### Visual Editing

1. Visit any page on your website
2. Add `?edit=true` to the URL
3. Click on editable content to modify it
4. Changes are saved automatically

## Development

### Adding New Content Types

To add new content types:

1. Update `tina/config.ts` with new collection definitions
2. Create corresponding content directories
3. Update components to fetch and display the new content

### Customizing Fields

You can customize field types and validation in `tina/config.ts`:

```typescript
{
  type: 'string',
  name: 'customField',
  label: 'Custom Field',
  required: true,
  ui: {
    component: 'textarea', // Custom component
  },
}
```

## Troubleshooting

### Common Issues

1. **Environment Variables**: Make sure all TinaCMS environment variables are set
2. **Content Not Loading**: Check browser console for errors
3. **Visual Editing Not Working**: Ensure you're on the correct branch and have proper permissions

### Fallback Behavior

The TinaCMS-enabled components are designed to fall back gracefully:
- If TinaCMS is unavailable, components show loading states
- If no content is found, components show appropriate empty states
- Static fallback content is provided for critical components

## Next Steps

1. Set up your TinaCMS Cloud account
2. Configure environment variables
3. Start adding content through the admin interface
4. Test visual editing on your pages
5. Customize content models as needed

## Support

- [TinaCMS Documentation](https://tina.io/docs/)
- [TinaCMS Community](https://tina.io/community/)
- [GitHub Issues](https://github.com/tinacms/tinacms/issues)
