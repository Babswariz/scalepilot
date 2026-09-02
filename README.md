# ScalePilot - The Strategic Engine for Modern Commerce

A complete, production-ready Next.js web application platform designed to help ecommerce store owners access strategic services, expertise, and operational support.

## Project Overview

ScalePilot is a comprehensive SaaS platform featuring:

- **Public Website** with multiple pages and sections
- **Multi-language Support** (English and Dutch)
- **Customer Service Request System** - Multi-step form for customers to request services
- **Support Ticket System** - Customer support management interface
- **Admin Dashboard** - Full administrative control panel with authentication
- **Database Architecture** - Prisma ORM with SQLite (easily migrable to PostgreSQL)
- **Premium Design** - Modern, sophisticated dark-theme interface with accent colors

## Tech Stack

- **Frontend**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM with SQLite (development)
- **Authentication**: Simple password-based admin authentication
- **API**: RESTful API routes with Next.js
- **Internationalization**: Custom translation system (EN/NL)

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- No additional system dependencies required for local development

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Set up the database:**

```bash
npm run prisma:generate
npm run prisma:migrate
```

This will create a SQLite database file at `prisma/dev.db` and set up all required tables.

3. **Environment Configuration:**

The `.env.local` file is already configured for local development:

```
DATABASE_URL="file:./prisma/dev.db"
ADMIN_PASSWORD="admin123"
```

**Important**: In production, change the `ADMIN_PASSWORD` to a strong password and use a production database URL.

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

### Production Build

```bash
npm run build
npm run start
```

## Application Structure

```
ScalePilot/
├── app/
│   ├── api/                    # API routes
│   │   ├── admin/
│   │   │   ├── login/route.ts
│   │   │   └── logout/route.ts
│   │   ├── service-requests/route.ts
│   │   └── support-tickets/route.ts
│   ├── admin/
│   │   ├── login/page.tsx      # Admin login page
│   │   └── page.tsx            # Admin dashboard
│   ├── capabilities/page.tsx   # Capabilities showcase
│   ├── faq/page.tsx            # FAQ page
│   ├── get-started/page.tsx    # Multi-step request form
│   ├── how-it-works/page.tsx   # Process explanation
│   ├── platform/page.tsx       # Homepage
│   ├── results/page.tsx        # Results/proof gallery
│   ├── support/page.tsx        # Support page with tickets
│   ├── globals.css             # Global styles
│   └── layout.tsx              # Root layout
├── components/
│   ├── Navigation.tsx          # Main navigation
│   └── Footer.tsx              # Footer component
├── lib/
│   ├── client-language.ts      # Language utility functions
│   └── translations.ts         # Complete translation system
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── dev.db                  # SQLite database (created after migration)
├── middleware.ts               # Route protection middleware
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## Key Features

### 1. Public Website Pages

- **Homepage (/platform)** - Hero section with introduction
- **Capabilities (/capabilities)** - Interactive showcase of 7 service offerings
- **Results (/results)** - Gallery for sales proof and case studies
- **How It Works (/how-it-works)** - Process explanation with timeline
- **FAQ (/faq)** - Comprehensive FAQ with accordion
- **Support (/support)** - Support portal with chat and ticket system
- **Get Started (/get-started)** - Multi-step service request form

### 2. Multi-Language System

- Complete English (EN) and Dutch (NL) translations
- Language preference saved in browser storage
- Language selector in navigation
- Welcome screen forces language selection on first visit
- Centralized translation system for easy maintenance

### 3. Service Request Management

- Multi-step form guiding customers through request process
- Collects: Name, email, business info, business stage, selected services, project context
- Requests saved to database with status tracking
- Admin dashboard shows all requests with filtering

### 4. Support System

- **Chat Interface**: Ready for future AI integration (placeholder UI)
- **Support Tickets**: Full ticket system with categories
- Save tickets to database with auto-generated IDs
- Admin can view, filter, and manage tickets

### 5. Admin Dashboard

- **Authentication**: Password-protected access
- **Overview**: Statistics and recent activity
- **Service Requests**: View and manage customer requests
- **Support Tickets**: View and manage support tickets
- **Capabilities**: (Coming soon) Edit capabilities and pricing
- **Pricing**: (Coming soon) Manage service pricing
- **Results**: (Coming soon) Upload and manage case studies
- **FAQ**: (Coming soon) Edit FAQ items
- **Settings**: (Coming soon) Configure platform settings

### 6. Database Architecture

Complete Prisma schema including:

- **Users**: Admin and user accounts
- **ServiceRequests**: Customer project requests
- **SupportTickets**: Support requests with replies
- **Capabilities**: Platform service definitions
- **PricingTier**: Service pricing information
- **Result**: Sales proof and case studies
- **FAQ**: Frequently asked questions
- **Setting**: Global platform settings

## Admin Access

### Login Page

**URL**: `http://localhost:3000/admin/login`

**Default Credentials** (local development only):
- Password: `admin123`

### Dashboard

**URL**: `http://localhost:3000/admin`

Access is protected by middleware and cookies. Log in first to access the dashboard.

**Important**: The login system uses a simple password mechanism for local development. In production, implement a proper authentication system with:
- Secure password hashing (bcrypt)
- Session management
- Rate limiting
- Multi-factor authentication

## Database Operations

### Generate Prisma Client

```bash
npm run prisma:generate
```

### Create and Run Migrations

```bash
npm run prisma:migrate
```

### Access Database

To manually inspect the database:

```bash
npx prisma studio
```

This opens an interactive database UI at `http://localhost:5555`

## API Routes

### Service Requests

- `POST /api/service-requests` - Create new request
- `GET /api/service-requests` - Get all requests

### Support Tickets

- `POST /api/support-tickets` - Create new ticket
- `GET /api/support-tickets` - Get all tickets

### Admin

- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout

## Design System

### Color Palette

- **Navy**: #071A33, #0B1220 (backgrounds)
- **White**: #F7F9FC, #FFFFFF
- **Grey**: #94A3B8 (text)
- **Primary Blue**: #2563EB, #3B82F6
- **Accents**: Purple, Green, Orange, Pink, Teal (for different capabilities)

### Typography

- Font Family: System UI (San Francisco, Segoe UI, Roboto)
- Font Sizes: Responsive with mobile considerations
- Font Weights: Bold headings, regular body text

### Components

- Reusable Navigation with mobile menu
- Footer with links and copyright
- Forms with validation
- Buttons with hover states
- Cards with borders and transitions
- Modals and dialogs (extensible)

## Development Workflow

### Running with Hot Reload

```bash
npm run dev
```

Changes to files are automatically reflected in the browser.

### Code Quality

```bash
npm run lint
```

Checks for linting errors using ESLint.

### Building for Production

```bash
npm run build
npm run start
```

Creates optimized production build.

## Future Integration Points

The application includes architecture for easy integration of:

- **Stripe Payments** - Payment processing (commented in env)
- **Email Service** - Customer notifications
- **AI Chat** - ScalePilot AI assistant (placeholder UI ready)
- **Cloud Storage** - Results image management
- **Analytics** - User behavior tracking
- **CRM Integration** - Customer data synchronization
- **PostgreSQL** - Production database migration

## Environment Variables

### Development (.env.local)

```
DATABASE_URL="file:./prisma/dev.db"
ADMIN_PASSWORD="admin123"
```

### Production

Set these variables in your hosting platform:

```
DATABASE_URL="postgresql://..."  # Production database URL
ADMIN_PASSWORD="<strong-password>"
STRIPE_SECRET_KEY="sk_..."       # When implementing payments
STRIPE_PUBLISHABLE_KEY="pk_..."
NODE_ENV="production"
```

## Troubleshooting

### Database Not Found

```bash
npm run prisma:generate
npm run prisma:migrate
```

### Port Already in Use

Change the port when running dev:

```bash
npm run dev -- -p 3001
```

### TypeScript Errors

Ensure TypeScript is properly configured:

```bash
npx tsc --noEmit
```

### Database Schema Issues

Reset the database:

```bash
npx prisma migrate reset
```

This will delete all data and recreate the database schema.

## Deployment

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Use PostgreSQL or another cloud database (not SQLite)
5. Deploy

### Other Platforms

Works on any platform supporting Node.js:
- Railway
- Heroku
- DigitalOcean
- AWS
- Azure
- Google Cloud

Ensure the platform supports:
- Node.js 18+
- Static file serving
- Environment variables
- Database connection

## Performance Considerations

- Images are optimized with Next.js Image component (when implemented)
- CSS is minified with Tailwind CSS
- JavaScript is code-split by route
- API requests are cached when appropriate
- Database queries should use indexes on frequently filtered fields

## Security

### Current Implementation

- Admin password stored in environment variables
- API routes are server-side
- Middleware protects admin routes
- No sensitive data in client-side code

### Production Recommendations

- Implement proper user authentication
- Use HTTPS/TLS for all connections
- Implement rate limiting on API endpoints
- Add CSRF protection
- Sanitize user input
- Use secure cookies (httpOnly, secure, sameSite)
- Implement proper error handling
- Add logging and monitoring
- Regular security audits

## Support & Maintenance

### Adding New Capabilities

1. Add to `capabilities` array in `/app/capabilities/page.tsx`
2. Update Prisma schema if needed
3. Add translations to `lib/translations.ts`
4. Update admin dashboard if needed

### Adding New Pages

1. Create file in `app/` folder
2. Use Navigation and Footer components
3. Add to navigation in `Navigation.tsx`
4. Add translations for new content

### Updating Translations

Edit `lib/translations.ts`:
- Add new keys to the translations object
- Update both `en` and `nl` objects
- Import and use in components with `getTranslation(key, language)`

## License

ScalePilot © 2026. All rights reserved.

---

## Getting Help

For issues or questions:

1. Check the Troubleshooting section above
2. Review Prisma documentation: https://www.prisma.io/docs/
3. Next.js documentation: https://nextjs.org/docs
4. Tailwind CSS documentation: https://tailwindcss.com/docs

## Contributing

To add features:

1. Create a new branch
2. Make changes following the existing code style
3. Test thoroughly (especially language switching and forms)
4. Ensure TypeScript compiles without errors
5. Submit pull request

---

**Last Updated**: August 2026
