# AMAI Café Website

A modern, minimalist website for AMAI Artisanal Bakehouse built with Next.js, featuring comprehensive media asset management and secure deployment practices.

## 🚀 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Media Asset Management**: Comprehensive verification and fallback system
- **Secure Deployment**: No sensitive data exposed in client-side code
- **Performance Optimized**: Lazy loading, compression, and caching
- **Accessibility**: Full WCAG compliance with keyboard navigation
- **Interactive Maps**: Optional Google Maps integration with static fallbacks

## 📦 Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd amai-cafe-website

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## 🔧 Configuration

### Environment Variables

The website works perfectly without any environment variables. For optional Google Maps integration:

\`\`\`bash
# Copy the example file
cp .env.example .env.local

# Add your Google Maps API key (optional)
GOOGLE_MAPS_API_KEY=your_actual_api_key_here
\`\`\`

**Note**: The Google Maps API key is handled server-side only. The website provides beautiful static maps as fallbacks.

### Media Assets

All media assets are automatically verified during build. Place your assets in:
- Images: `public/images/`
- Videos: `public/videos/`
- Logos: `public/`

## 🛠️ Development

\`\`\`bash
# Start development server
npm run dev

# Verify all media assets
npm run verify-assets

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 📱 Deployment

The website is deployment-ready with:

- ✅ **No sensitive environment variables in client code**
- ✅ **Comprehensive asset verification**
- ✅ **Static optimization enabled**
- ✅ **Proper caching headers**
- ✅ **Security headers configured**
- ✅ **Fallback systems for all external dependencies**

### Deployment Checklist

1. **Assets**: All media assets are verified and included
2. **Security**: No API keys or sensitive data in client bundle
3. **Performance**: Images optimized, compression enabled
4. **Compatibility**: Works across all browsers and devices
5. **Accessibility**: Full keyboard navigation and screen reader support

## 🎯 Key Components

- **Media Asset Manager**: Centralized asset verification and fallback system
- **Verified Components**: Smart image/video components with error handling
- **Static Map Fallback**: Beautiful map representation without API dependencies
- **Asset Verification Panel**: Development tool for monitoring asset status

## 🔒 Security

- Server-side API key handling
- No sensitive data in client bundle
- Proper CORS and security headers
- Input validation and sanitization

## 📊 Performance

- Lazy loading for images and videos
- Optimized asset delivery
- Compression and caching
- CDN-ready configuration

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📞 Support

For issues or questions, please check the deployment logs or contact the development team.
