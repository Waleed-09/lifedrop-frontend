# 🩸 LifeDrop — Emergency Blood Donation & Request Platform (Frontend)

> **Connecting blood donors with patients in emergency situations quickly, efficiently, and seamlessly.**

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?style=for-the-badge&logo=tailwind-css)
![PHP](https://img.shields.io/badge/PHP-Laravel_Backend-777BB4?style=for-the-badge&logo=php)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql)

---

## 📌 About LifeDrop

**LifeDrop** is a modern, responsive web platform designed to bridge the gap between urgent blood requirements and willing blood donors. Whether someone needs an immediate blood donation during a medical emergency or wants to register as an active blood donor to save lives, LifeDrop provides a streamlined, user-friendly interface to manage requests, find nearby donors, and track donations in real-time.

---

## ✨ Key Features

- 🚨 **Emergency Blood Requests**: Post urgent blood requirements specifying hospital, city, blood group, required units, and urgency level with direct contact options.
- 🔍 **Smart Nearby Donor Search**: Filter active and verified blood donors by city and specific blood group (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`).
- 🩸 **Blood Compatibility Matrix**: An interactive visual guide helping users understand recipient and donor blood group compatibility.
- 👤 **Donor Dashboard & Real-Time Availability**: Donors can manage their personal profiles, update last donation dates, and toggle their active availability status instantly.
- 🛡️ **Admin Moderation Portal**: Dedicated administrative section for overseeing requests, managing registered donors, and monitoring platform metrics.
- 📊 **Platform Statistics & Impact Metrics**: Live metrics displaying total registered donors, fulfilled requests, partner hospitals, and estimated lives saved.
- ⚡ **Dual-Backend Support**: Built-in mock API fallback in Next.js (`app/api/v1/...`) ensuring the app functions seamlessly even during standalone offline frontend testing without the PHP server active.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### **Backend & Database Integration**
- **Backend API**: PHP (Laravel / REST API) with JWT Bearer Token Authentication
- **Database**: MySQL (`lifedrop_database.sql` schema included in root of this directory)

---

## 📁 Folder Structure

```
lifedrop-frontend/
├── app/                      # Next.js 16 App Router Pages & API Handlers
│   ├── about/                # About Us page
│   ├── admin/                # Admin Moderation Portal
│   ├── api/v1/               # Internal Fallback API Handlers
│   ├── contact/              # Contact Us page
│   ├── donor/                # Donor Dashboard & Availability Toggle
│   ├── login/                # User Authentication (Login)
│   ├── privacy/              # Privacy Policy
│   ├── request/              # Post Emergency Blood Request
│   ├── search/               # Donor Search & Filters
│   ├── signup/               # User / Donor Registration
│   ├── terms/                # Terms of Service
│   ├── layout.tsx            # Global Layout & Providers
│   └── page.tsx              # Landing Page
├── components/               # Reusable React Components
│   ├── home/                 # Hero, Features, Stats, Compatibility Matrix
│   ├── layout/               # Navbar & Footer
│   └── ui/                   # Custom UI Components (Toasts, Modals)
├── lib/                      # Helper Utilities & API Service Client
├── public/                   # Static Assets & Images
├── lifedrop_database.sql     # MySQL Database Schema Import File
└── PHP_BACKEND_GUIDE.md      # Detailed PHP API Integration Spec
```

---

## 🚀 Getting Started

### Prerequisites
Ensure you have Node.js installed (v18.0.0 or higher).

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create `.env.local` in `lifedrop-frontend`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup (MySQL)

1. Create a MySQL database named `lifedrop_db`.
2. Import [`lifedrop_database.sql`](./lifedrop_database.sql) into phpMyAdmin or MySQL CLI.
3. Check [`PHP_BACKEND_GUIDE.md`](./PHP_BACKEND_GUIDE.md) for full REST API specifications.

---

## 📄 License

This project is licensed under the MIT License.
