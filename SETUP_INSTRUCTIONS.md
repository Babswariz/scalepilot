# ScalePilot Setup Guide - Node.js Installation Required

## Current Status

The ScalePilot project has been fully scaffolded with all necessary files, configurations, and code. However, Node.js and npm are not currently installed on your system, which are required to run the application.

## ⚠️ Next Steps Required

### 1. Install Node.js (REQUIRED)

Node.js must be installed before proceeding. You have several options:

#### Option A: Download from Official Website (Recommended for Windows)

1. Visit: https://nodejs.org/
2. Download the LTS (Long Term Support) version for Windows
3. Run the installer and follow the prompts
4. Verify installation by opening PowerShell and running:

```powershell
node --version
npm --version
```

#### Option B: Use Winget (Windows Package Manager)

If you have Windows Package Manager installed, open PowerShell and run:

```powershell
winget install OpenJS.NodeJS
```

Then reload your terminal and verify:

```powershell
node --version
npm --version
```

#### Option C: Use Windows Subsystem for Linux (WSL2)

If you're comfortable with WSL2:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. After Installing Node.js

Once Node.js is installed, return to the project folder and run:

```powershell
cd "C:\Users\USER\OneDrive\Documents\ScalePilot"

# Install all dependencies
npm install

# Set up the database
npm run prisma:generate
npm run prisma:migrate

# Start the development server
npm run dev
```

### 3. Access the Application

Once `npm run dev` is running, open your browser and navigate to:

- **Main Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/login

### 4. Default Admin Credentials

- **Username**: (automatic, not required)
- **Password**: `admin123`

## Project Status

✅ **Completed:**
- Next.js 15 project structure fully scaffolded
- TypeScript configuration with strict mode
- Tailwind CSS setup with custom color system
- Prisma ORM with SQLite database schema
- Complete English and Dutch translation system
- All public pages created (Platform, Capabilities, Results, etc.)
- Multi-step get-started request form
- Support system with ticket management
- Admin authentication and dashboard
- API routes for data management
- Middleware for route protection
- Responsive mobile design
- Dark theme with accent colors

## File Structure Verified

The project includes:

```
✓ app/
  ✓ api/                          (API routes)
  ✓ admin/                        (Admin login & dashboard)
  ✓ platform/page.tsx             (Homepage)
  ✓ capabilities/page.tsx         (Services showcase)
  ✓ results/page.tsx              (Results gallery)
  ✓ how-it-works/page.tsx         (Process explanation)
  ✓ faq/page.tsx                  (FAQ)
  ✓ support/page.tsx              (Support system)
  ✓ get-started/page.tsx          (Request form)
  ✓ layout.tsx                    (Root layout)
  ✓ page.tsx                      (Welcome screen)
  ✓ globals.css                   (Global styles)

✓ components/
  ✓ Navigation.tsx                (Main navigation)
  ✓ Footer.tsx                    (Footer)

✓ lib/
  ✓ translations.ts               (EN/NL translations)
  ✓ client-language.ts            (Language utilities)

✓ prisma/
  ✓ schema.prisma                 (Database schema)

✓ Configuration Files
  ✓ tsconfig.json                 (TypeScript)
  ✓ tailwind.config.ts            (Tailwind)
  ✓ next.config.js                (Next.js)
  ✓ postcss.config.js             (PostCSS)
  ✓ middleware.ts                 (Route protection)
  ✓ package.json                  (Dependencies)
  ✓ .env.local                    (Environment variables)
  ✓ .env.example                  (Example env)
  ✓ .gitignore                    (Git ignore)
  ✓ README.md                     (Documentation)
```

## Commands for Later Use

Once Node.js is installed, these are your main commands:

```powershell
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Run production build
npm run start

# Database operations
npm run prisma:generate      # Generate Prisma client
npm run prisma:migrate       # Run migrations
npm run prisma:seed          # Seed database (if seed file exists)

# Code quality
npm run lint                 # Run ESLint
```

## Troubleshooting After Installation

**Port 3000 already in use?**
```powershell
npm run dev -- -p 3001
```

**Database issues?**
```powershell
npx prisma migrate reset
```

**TypeScript errors?**
```powershell
npx tsc --noEmit
```

## Features Ready to Test

Once the application is running, you can immediately test:

1. ✅ Welcome screen with language selection (EN/NL)
2. ✅ Multi-language navigation and pages
3. ✅ Capabilities showcase with interactive cards
4. ✅ Multi-step get-started form with validation
5. ✅ Support ticket system with form submission
6. ✅ Admin login (password: admin123)
7. ✅ Admin dashboard with data tables
8. ✅ Responsive mobile design
9. ✅ Smooth transitions and hover effects
10. ✅ Database persistence (SQLite)

## Important Notes

⚠️ **Local Development Only:**
- Admin password is in environment variables (not secure for production)
- SQLite database is stored locally (not suitable for multi-user systems)
- Translation system is manually maintained

🔒 **Before Production:**
- Implement proper authentication with password hashing
- Migrate to PostgreSQL or similar production database
- Add HTTPS/TLS encryption
- Implement rate limiting
- Add comprehensive error handling and logging
- Set up monitoring and alerts
- Enable CSRF protection
- Implement proper session management

## Need Help?

1. Check README.md in the project folder for detailed documentation
2. Verify Node.js is properly installed by running `node --version`
3. Ensure you're in the correct directory: `C:\Users\USER\OneDrive\Documents\ScalePilot`
4. Delete `node_modules` and `package-lock.json` and run `npm install` again if issues persist

---

**Project Created**: August 2026
**Status**: Ready for Node.js installation and local testing
**Next Action**: Install Node.js using Option A, B, or C above, then run `npm install`
