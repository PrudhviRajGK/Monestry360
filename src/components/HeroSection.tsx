import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
  User
} from 'firebase/auth';
import monastery1 from '@/assets/monastery1.jpg';
import monastery2 from '@/assets/monastery2.jpg';
import monastery3 from '@/assets/monastery3.jpg';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAciriJZH-nXszZVznWXDEAWZJQh4-qFTs",
  authDomain: "edu-sphere-46faa.firebaseapp.com",
  projectId: "edu-sphere-46faa",
  storageBucket: "edu-sphere-46faa.firebasestorage.app",
  messagingSenderId: "1085764621488",
  appId: "1:1085764621488:web:dbb690e8ee0306e83a1775"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Set session persistence so users have to login every time
setPersistence(auth, browserSessionPersistence);

// Props for controlling navigation visibility
interface HeroSectionProps {
  onAuthStateChange: (isAuthenticated: boolean) => void;
}

const HeroSection = ({ onAuthStateChange }: HeroSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);
  
  const images = [monastery1, monastery2, monastery3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    // Listen for auth state changes but force logout on initial load
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCheckedAuth(true);
      
      // Force logout any existing user on component mount
      if (user && !checkedAuth) {
        signOut(auth);
        setUser(null);
        onAuthStateChange(false);
      } else {
        setUser(user);
        onAuthStateChange(!!user);
      }
    });
    
    return () => unsubscribe();
  }, [onAuthStateChange, checkedAuth]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        // Sign in
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign up
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      // Handle specific error messages
      if (error.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (error.code === 'auth/user-disabled') {
        setError('This account has been disabled');
      } else if (error.code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear form fields after logout
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setError(error.message);
    }
  };

  // If user is not authenticated, show login/signup form
  if (!user) {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image} 
                alt={`Sikkim Monastery ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}
        </div>

        {/* Prayer Flags Decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-prayer opacity-80"></div>

        {/* Login/Signup Form */}
        <div className="relative z-10 bg-card/90 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🏛️</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-muted-foreground mt-2">
              {isLogin ? 'Sign in to explore sacred monasteries' : 'Join us to discover spiritual heritage'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-background text-foreground"
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-background text-foreground"
                required
                placeholder="Enter your password"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-amber-600 hover:text-amber-700 font-medium text-sm"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Login"}
            </button>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>
    );
  }

  // If user is authenticated, show the hero content
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 z-20 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 font-medium rounded-lg transition-all duration-300 hover:bg-white/30"
      >
        Logout
      </button>

      {/* Background Images */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`Sikkim Monastery ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>

      {/* Prayer Flags Decoration */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-yellow-500 opacity-80"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
          Sacred Monasteries of Sikkim
        </h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-md max-w-2xl mx-auto leading-relaxed">
          Discover the spiritual heritage and ancient wisdom preserved in the sacred monasteries 
          of the Himalayas through our digital archives and cultural preservation initiative.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('digital-archives')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-large transition-all duration-300 transform hover:scale-105"
          >
            Explore Digital Archives
          </button>
          <button 
            onClick={() => document.getElementById('ai-search')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 font-semibold rounded-lg shadow-large transition-all duration-300 transform hover:scale-105 hover:bg-white/30"
          >
            AI-Powered Search
          </button>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;