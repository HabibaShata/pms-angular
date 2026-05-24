# 🗂️ Project Management System (PMS)

A project management web application built with Angular 16, designed to help teams manage projects and tasks efficiently.

---

## 🚀 Tech Stack

- **Framework:** Angular 16
- **Styling:** Bootstrap 5.3 + Angular Material 16 + SCSS
- **Icons:** Font Awesome
- **Language:** TypeScript

---

## ⚙️ Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18.x (recommended: v18.20.8)
- [NVM](https://github.com/nvm-sh/nvm) (recommended for managing Node versions)
- Angular CLI v16

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/pms-angular.git
cd pms-angular
```

### 2. Switch to the correct Node version

```bash
nvm use v18.20.8
```

### 3. Install Angular CLI globally (first time only)

```bash
npm install -g @angular/cli@16
```

### 4. Install dependencies

```bash
npm install
```

### 5. Run the development server

```bash
npm run start
```

Navigate to `http://localhost:4200/`

---

## 📜 Available Scripts

| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `npm run start` | Run dev server on `http://localhost:4200/` |
| `npm run build` | Build for production                       |
| `npm run watch` | Build and watch for changes                |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── core/               # Guards, interceptors, core services
│   ├── features/           # Lazy loaded feature modules
│   │   ├── auth/
│   │
│   │
│   ├── layout/             # Navbar, sidebar
│   └── shared/             # Shared components, pipes, directives
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── environments/
│   ├── environment.ts      # Development
│   └── environment.prod.ts # Production
└── styles/
    ├── _variables.scss
    ├── _mixins.scss
    └── _typography.scss
```

---

## 🌍 Environment Variables

The project uses Angular's environment files for configuration.

`src/environments/environment.ts` (development):

```typescript
export const environment = {
  production: false,
  apiUrl: "https://upskilling-egypt.com:3003",
};
```

---

## 🔗 API Reference

Base URL: `https://upskilling-egypt.com:3003`

Full API documentation: [Swagger Docs](https://upskilling-egypt.com:3003/docs/)

---

## 👥 Team

| Name   | Role |
| ------ | ---- |
| Habiba |      |
| Esraa  |      |
| Marim  |      |
| Nour   |      |

---

## 📝 Notes

- Do **not** commit `environment.prod.ts` if it contains sensitive data
- Always use `npm run start` instead of `ng serve` directly
- Make sure you're on **Node v18** before running the project
