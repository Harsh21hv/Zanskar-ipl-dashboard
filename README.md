# IPL Dashboard

A modern, real-time IPL (Indian Premier League) dashboard built with Next.js that provides comprehensive cricket match information and statistics.

## 🌐 Live Demo

Visit the live application: [IPL Dashboard](https://zanskar-ipl-dashboard-t6kl.vercel.app)

## ✨ Features

### 🔴 Live Match Updates
- **Auto-refreshing live matches** - No manual reload required
- Real-time match status updates
- Live match indicators with visual animations
- Toss details for ongoing matches

### 📊 Dynamic Points Table
- **Automatically updates** when matches are completed
- Real-time team standings calculation
- Win/loss records and net run rate tracking
- Interactive team statistics

### 🏏 Comprehensive Match Information
- **Live Matches** - Currently ongoing games with live updates
- **Upcoming Matches** - Future scheduled matches with date/time
- **Completed Matches** - Historical results with detailed scorecards
- Match venue information and team details

### 📱 Fully Responsive Design
- **Mobile-first approach** - Optimized for all screen sizes
- **Tablet and desktop support** - Seamless experience across devices
- **Adaptive layouts** - Vertical stack on mobile, horizontal carousel on larger screens
- Touch-friendly interface with smooth animations

### 🎨 Modern UI/UX
- Clean, intuitive dashboard design
- Smooth transitions and hover effects
- Dark mode support (system preference detection)
- Loading states and error handling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed on your machine
- MongoDB Atlas account (or local MongoDB instance)
- Git for version control

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harsh21hv/Zanskar-ipl-dashboard.git
   cd Zanskar-ipl-dashboard/ipl-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env.local` file in the root directory
   - Add your MongoDB connection string:
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Initial Data Setup
After starting the development server, you can seed the database with initial match data:
- Visit `http://localhost:3000/api/seed-matches` to populate sample data
- Or use the scraping endpoint: `http://localhost:3000/api/scrape`

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Vercel
- **API**: Next.js API Routes (Serverless Functions)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (Paths)/          # Route groups
│   └── page.tsx          # Main dashboard
├── components/            # Reusable UI components
├── context/              # React context providers
├── models/               # MongoDB schemas
├── types/                # TypeScript type definitions
└── utils/                # Utility functions and hooks
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Vertical layout)
- **Tablet**: 768px - 1024px (Mixed layout)
- **Desktop**: > 1024px (Horizontal carousel)



