
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  User, 
  FileText, 
  LogOut, 
  Menu, 
  X,
  Home
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // This would be controlled by your auth system

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Temporary auth simulation - in real app this would use a proper auth system
  useEffect(() => {
    // Check if we're on an authenticated page
    setIsAuthenticated(
      ['/dashboard', '/upload', '/profile', '/order-preview'].includes(location.pathname)
    );
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isAuthenticated 
          ? 'py-3 bg-white/90 backdrop-blur-sm shadow-soft' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <span className="text-xerox-600 font-bold text-2xl tracking-tight">AXMS</span>
          <div className="hidden md:block px-2 py-1 bg-xerox-100 rounded-md">
            <span className="text-xerox-800 text-xs font-medium">Student</span>
          </div>
        </Link>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-2 font-medium transition-colors ${
                  location.pathname === '/dashboard' 
                    ? 'text-xerox-600' 
                    : 'text-gray-600 hover:text-xerox-500'
                }`}
              >
                <Home size={18} />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/upload" 
                className={`flex items-center space-x-2 font-medium transition-colors ${
                  location.pathname === '/upload' 
                    ? 'text-xerox-600' 
                    : 'text-gray-600 hover:text-xerox-500'
                }`}
              >
                <Upload size={18} />
                <span>Upload</span>
              </Link>
              <Link 
                to="/order-preview" 
                className={`flex items-center space-x-2 font-medium transition-colors ${
                  location.pathname === '/order-preview' 
                    ? 'text-xerox-600' 
                    : 'text-gray-600 hover:text-xerox-500'
                }`}
              >
                <FileText size={18} />
                <span>Orders</span>
              </Link>
              <Link 
                to="/profile" 
                className={`flex items-center space-x-2 font-medium transition-colors ${
                  location.pathname === '/profile' 
                    ? 'text-xerox-600' 
                    : 'text-gray-600 hover:text-xerox-500'
                }`}
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                className="ml-4 text-gray-700 border-gray-300 hover:bg-gray-100"
                onClick={() => {
                  // Logout logic here
                  window.location.href = '/';
                }}
              >
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link 
                to="/" 
                className={`font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'text-xerox-600' 
                    : 'text-gray-600 hover:text-xerox-500'
                }`}
              >
                Home
              </Link>
              <Button 
                variant="default"
                className="bg-xerox hover:bg-xerox-600"
              >
                Sign In
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md animate-slide-down">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    location.pathname === '/dashboard' 
                      ? 'bg-xerox-50 text-xerox-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Home size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/upload" 
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    location.pathname === '/upload' 
                      ? 'bg-xerox-50 text-xerox-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Upload size={18} />
                  <span>Upload</span>
                </Link>
                <Link 
                  to="/order-preview" 
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    location.pathname === '/order-preview' 
                      ? 'bg-xerox-50 text-xerox-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText size={18} />
                  <span>Orders</span>
                </Link>
                <Link 
                  to="/profile" 
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    location.pathname === '/profile' 
                      ? 'bg-xerox-50 text-xerox-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-gray-700 border-gray-300"
                  onClick={() => {
                    // Logout logic here
                    window.location.href = '/';
                  }}
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/" 
                  className={`p-2 rounded-lg ${
                    location.pathname === '/' 
                      ? 'bg-xerox-50 text-xerox-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Home
                </Link>
                <Button 
                  variant="default"
                  className="w-full bg-xerox hover:bg-xerox-600"
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
