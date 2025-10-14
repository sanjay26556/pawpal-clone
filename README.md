# PawPal - Pet Rescue Community Platform

A modern web application built with React, TypeScript, Material-UI, and Firebase to connect pet lovers, share rescue stories, and help save lives.

## 🚀 Features

- **Authentication**: Email/password and Google sign-in with Firebase Auth
- **Modern UI**: Clean, responsive design with Material-UI
- **Real-time Data**: Firebase Firestore integration
- **Type Safety**: Full TypeScript support
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Firebase project set up

## 🔧 Installation & Setup

### Step 1: Extract and Navigate
1. Extract the `pawpal-heartfelt-connect-fixed.zip` file
2. Open terminal/command prompt
3. Navigate to the project directory:
   ```bash
   cd pawpal-heartfelt-connect-fixed
   ```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Firebase Configuration
1. The Firebase configuration is already included in `.env.local`
2. Your Firebase project details are:
   - Project ID: `pawpal-heartfelt-connect`
   - API Key: Already configured
   - Auth Domain: `pawpal-heartfelt-connect.firebaseapp.com`

3. **Enable Authentication in Firebase Console:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your `pawpal-heartfelt-connect` project
   - Navigate to **Authentication** → **Sign-in method**
   - Enable **Email/Password** and **Google** providers

4. **Set up Firestore Database:**
   - Go to **Firestore Database**
   - Create database in test mode
   - Choose your preferred location

### Step 4: Run the Development Server
```bash
npm run dev
```

The application will open at: **http://localhost:5173**

## 🎯 Usage Instructions

### First Time Setup
1. Open the application in your browser
2. You'll see the authentication page with PawPal branding
3. Create a new account or sign in with Google
4. Once authenticated, you'll be redirected to the home feed

### Navigation
- **Home Feed**: View rescue stories and community posts
- **Profile Menu**: Access your profile and logout option
- **Floating Action Button**: Future feature for creating posts

### Authentication Features
- **Email/Password**: Create account or sign in
- **Google Sign-in**: One-click authentication
- **Password Visibility**: Toggle to show/hide password
- **Error Handling**: User-friendly error messages
- **Auto-redirect**: Automatic navigation after successful auth

## 🏗️ Project Structure

```
pawpal-heartfelt-connect-fixed/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── screens/       # Main screen components
│   │   └── ui/            # Reusable UI components
│   ├── contexts/          # React contexts (Auth)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Firebase configuration
│   ├── pages/             # Page components
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main app component
│   └── main.tsx           # App entry point
├── .env.local             # Environment variables (Firebase config)
├── package.json           # Dependencies and scripts
└── vite.config.ts         # Vite configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Security & Configuration

### Environment Variables
All Firebase configuration is stored in `.env.local`:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### Firebase Security Rules
For production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Import Errors**: 
   - Ensure all dependencies are installed: `npm install`
   - Check that `@` alias is working in `vite.config.ts`

2. **Firebase Authentication Errors**:
   - Verify Firebase project configuration
   - Check that Auth providers are enabled
   - Ensure API keys are correct

3. **Build Errors**:
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check TypeScript errors: `npx tsc --noEmit`

4. **Port Issues**:
   - If port 5173 is busy, Vite will automatically use the next available port
   - You can specify a port: `npm run dev -- --port 3000`

### Firebase Console Links
- [Firebase Console](https://console.firebase.google.com/)
- [Authentication Settings](https://console.firebase.google.com/project/pawpal-heartfelt-connect/authentication)
- [Firestore Database](https://console.firebase.google.com/project/pawpal-heartfelt-connect/firestore)

## 🎨 Customization

### Theming
The app uses Material-UI's theming system. Customize colors and typography in `src/App.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change primary color
    },
  },
});
```

### Adding New Features
1. Create new components in appropriate directories
2. Add new pages to `src/pages/`
3. Update routing in `App.tsx`
4. Add new types to `src/types/index.ts`

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🔮 Future Features

- Create and share posts
- Real-time messaging
- Advanced pet matching
- Community events
- Volunteer coordination
- Image upload for pets
- Geographic location services
- Push notifications

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify Firebase configuration
4. Check browser console for errors

## 🏆 Success Checklist

✅ Node.js installed  
✅ Dependencies installed (`npm install`)  
✅ Firebase authentication enabled  
✅ Firestore database created  
✅ Development server running (`npm run dev`)  
✅ Application accessible at http://localhost:5173  
✅ Can create account/sign in  
✅ Redirected to home feed after authentication  

## 📄 License

This project is private and created for educational purposes.

---

**Built with ❤️ for animal rescue communities**
