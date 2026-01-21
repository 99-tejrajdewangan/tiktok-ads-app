# 🚀 TikTok Ads Creative Flow

A modern React application simulating TikTok Ads creation flow with OAuth integration, real-time validation, and comprehensive error handling.

## 📋 Features

- **Secure OAuth 2.0 Integration** - Mock TikTok Ads account connection
- **Smart Form Validation** - Real-time field validation with custom rules
- **Conditional Music Selection** - Dynamic music options based on campaign objective
- **Comprehensive Error Handling** - User-friendly error messages for all API scenarios
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Mock API Service** - Simulated TikTok Ads API with realistic responses

## 🛠️ Tech Stack

- **React 18** - Latest version with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form validation library
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Toast notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

1. **Clone and setup:**
```bash
# Create project
npm create vite@latest tiktok-ads-creative-flow -- --template react
cd tiktok-ads-creative-flow

# Install dependencies
npm install react-router-dom axios react-hook-form react-hot-toast lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Copy project files or create them as shown above