# 🚀 Sanket Dhuri — Developer Portfolio



---

## 📖 About The Project

A **production-grade, full-stack developer portfolio** built with React + TypeScript + Vite, powered by Supabase as the live backend. The public site showcases all key sections with smooth UI, while a built-in Admin Panel lets you manage every piece of content in real time — no redeploy needed.

> Built by **Sanket Dhuri** — Web & App Developer · AI & Data Science Engineer from Mumbai 🇮🇳

---

## ✨ Key Features

- 🎨 **Beautiful Public Portfolio** — Hero, About, Skills, Projects, Experience and Contact sections
- 🔐 **Built-in Admin Panel** — Manage all portfolio content from a protected dashboard at `/admin`
- 🗄️ **Supabase Backend** — PostgreSQL database with real-time data fetching
- 🌗 **Light / Dark Theme Switcher** — Powered by `ThemeContext`
- 🦴 **Skeleton Loaders** — Smooth loading states for a polished user experience
- ⚡ **Blazing Fast** — Vite-powered build with Hot Module Replacement in development
- 📱 **Fully Responsive** — Mobile-first design that looks great on any device
- 🧩 **Context API State Management** — Clean global state via `PortfolioContext` and `ThemeContext`
- 🔷 **100% TypeScript** — Fully typed codebase for reliability and great DX

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Backend / Database** | Supabase (PostgreSQL) |
| **State Management** | React Context API |
| **Linting** | ESLint with TypeScript rules |
| **Deployment** | Vercel |

---

## ⚙️ Installation & Local Setup

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- A free Supabase account at supabase.com

### 1. Clone the Repository

```bash
git clone https://github.com/sanketdhuri9604/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Both values are available in your Supabase project under **Settings → API**.

### 4. Set Up Supabase

1. Go to supabase.com and create a free account
2. Create a New Project
3. In the Table Editor, create tables — `projects`, `skills`, `experience`, `profile`
4. Copy your Project URL and anon public key into `.env.local`
5. Set up Row Level Security (RLS) policies for the admin panel

### 5. Start the Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🧭 Usage

### Public Site

Visit the homepage to explore all sections — Hero, About, Skills, Projects, Experience, and Contact.

### Admin Panel

1. Navigate to `/admin`
2. Log in with your Supabase credentials
3. Use the dashboard to manage content in real time:
   - 👤 **Profile** — Name, bio, avatar, social links
   - 💼 **Projects** — Add, edit, or remove portfolio projects
   - 🧠 **Skills** — Update your tech skills
   - 🏢 **Experience** — Manage your work history

All changes save directly to Supabase and reflect instantly on the public site.

---

## 📁 Project Structure

```
Portfolio/
├── public/                        # Static assets
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx        # Landing / intro section
│   │   ├── AboutSection.tsx       # About me section
│   │   ├── SkillsSection.tsx      # Skills display
│   │   ├── ProjectsSection.tsx    # Projects showcase
│   │   ├── ExperienceSection.tsx  # Work experience timeline
│   │   ├── ContactSection.tsx     # Contact form and info
│   │   ├── Navbar.tsx             # Top navigation bar
│   │   ├── AdminPanel.tsx         # Admin dashboard
│   │   ├── SkeletonLoader.tsx     # Loading skeleton UI
│   │   ├── PortfolioContext.tsx   # Global portfolio data context
│   │   ├── ThemeContext.tsx       # Light/Dark theme context
│   │   ├── portfolioData.ts       # Default/fallback portfolio data
│   │   └── supabaseClient.ts      # Supabase client initialization
│   ├── lib/
│   │   └── utils.ts               # Utility/helper functions
│   ├── pages/
│   │   └── Index.tsx              # Main page entry point
│   ├── App.tsx                    # Root component and routing
│   ├── index.css                  # Tailwind base styles
│   └── main.tsx                   # React app entry point
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## ☁️ Deployment to Vercel

1. Push your code to GitHub
2. Go to vercel.com and import your repository
3. Add these Environment Variables in the Vercel project settings:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

4. Click Deploy — Vercel handles the build automatically
5. Visit your live URL and log in at `/admin` to start managing content

> Since all data lives in Supabase, your content persists across every redeployment automatically.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch — `git checkout -b feature/AmazingFeature`
3. Commit your changes — `git commit -m 'Add some AmazingFeature'`
4. Push to the branch — `git push origin feature/AmazingFeature`
5. Open a Pull Request

Please test your changes locally before submitting a PR.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

Feel free to use this as a template for your own portfolio. A star ⭐ is appreciated!

---

## 👨‍💻 Author

**Sanket Dhuri**

Web & App Developer · AI & Data Science Engineer · Mumbai, India

GitHub — github.com/sanketdhuri9604

Live Site — portfolio-six-olive-37.vercel.app

---

*Made with ❤️ and lots of ☕ by Sanket Dhuri*

⭐ **If you found this project helpful, please give it a star!** ⭐
