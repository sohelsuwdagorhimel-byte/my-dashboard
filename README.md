# mylivesite




## Features

- Authentication
- Dark mode
- Responsive tables
- Local storage
- Responsive design
- Offline support
- Lazy loading
- Form validation
- Social sharing
- Analytics
- Service worker
- Favicon
- Robots txt
- Meta tags

## Technologies Used

- **Frameworks**: TAILWIND, ALPINE, CHARTJS, AXIOS, JQUERY, MOMENT, AOS
- **Fonts**: open-sans, raleway

## Getting Started

1. Open `index.html`
2. Open the preview

## Project Structure

```
.
├── index.html          # Main HTML file
├── login.html          # Login page
├── register.html       # Registration page
├── offline.html        # Offline fallback page
├── css/
│   └── style.css      # Custom styles
├── js/
│   └── script.js      # Custom JavaScript
│   └── auth.js        # Authentication module
│   └── social-sharing.js  # Social sharing functionality

├── favicon.svg        # Scalable favicon
├── icons/             # Favicon PNG files

├── robots.txt         # Robots file
└── README.md          # This file
```

## Customization

- Update colors in `css/style.css` CSS variables
- Modify content in `index.html`
- Add custom JavaScript in `js/script.js`


### Authentication Setup

This project includes authentication UI templates. To enable authentication:

1. Set up your backend API (Node.js, Python, PHP, etc.)
2. Update `API_BASE_URL` in `js/auth.js` with your backend endpoint
3. Implement the following backend endpoints:
   - `POST /api/auth/register` - User registration
   - `POST /api/auth/login` - User login
   - `GET /api/auth/verify` - Token verification (optional)
   - `PUT /api/auth/profile` - Update user profile
   - `POST /api/auth/forgot-password` - Password reset

Backend should return JWT tokens in the format: `{ token: "...", user: {...} }`

Access the authentication pages:
- Login: `login.html`
- Register: `register.html`

### Analytics Setup

This project includes support for popular analytics providers. To enable analytics:

**Option 1: Google Analytics**
1. Create a Google Analytics account at https://analytics.google.com
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Open `index.html` and uncomment the Google Analytics script
4. Update the script with your Measurement ID

**Option 2: Plausible Analytics (Privacy-friendly)**
1. Sign up at https://plausible.io or self-host
2. Add your domain to Plausible
3. Open `index.html` and uncomment the Plausible script
4. Update the data-domain attribute with your domain

**Option 3: Matomo Analytics (Self-hosted)**
1. Install Matomo on your server
2. Get your Matomo URL and Site ID
3. Open `index.html` and uncomment the Matomo script
4. Update the script with your Matomo URL and Site ID

### Social Sharing

Social sharing functionality is available in `js/social-sharing.js`. To use it:

```html
<!-- Add share buttons to your HTML -->
<button data-share="twitter">Share on Twitter</button>
<button data-share="facebook">Share on Facebook</button>
<button data-share="linkedin">Share on LinkedIn</button>
<button data-share="whatsapp">Share on WhatsApp</button>
<button data-share="email">Share via Email</button>
<button data-share="copy">Copy Link</button>

<!-- Or use the native share API -->
<button data-share="native">Share</button>
```

Programmatic sharing:
```javascript
socialSharing.shareTwitter('Custom tweet text');
socialSharing.shareFacebook();
socialSharing.copyLink();
socialSharing.nativeShare();
```

### Offline Support

Enhanced offline support is enabled with network-first strategy for HTML and cache-first for assets. The app will show `offline.html` when offline. The service worker automatically caches resources for offline use.

### Responsive Design

The project uses a mobile-first approach with breakpoints:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large Desktop: 1440px+

### Responsive Tables

Wrap tables with the `.table-responsive` class for mobile-friendly display:
```html
<div class="table-responsive">
    <table>
        <thead>
            <tr><th>Column 1</th><th>Column 2</th></tr>
        </thead>
        <tbody>
            <tr>
                <td data-label="Column 1">Value 1</td>
                <td data-label="Column 2">Value 2</td>
            </tr>
        </tbody>
    </table>
</div>
```

Note: Add `data-label` attributes to `<td>` elements for mobile card layout.

## License

This project was generated with WebDevStudio.

---

Built with ❤️ using WebDevStudio