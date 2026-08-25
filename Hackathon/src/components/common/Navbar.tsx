import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Heart, User, Menu, X, Calculator, Home, Building2, TrendingUp, History } from 'lucide-react';
import { useSavedProperties } from '../../hooks/useSavedProperties';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { savedIds } = useSavedProperties();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Properties', path: '/properties', icon: Building2 },
    { name: 'Valuation', path: '/valuation', icon: Calculator },
    { name: 'Market Insights', path: '/market-insights', icon: TrendingUp },
    { name: 'Dashboard', path: '/dashboard', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-subtle">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Logo variant="full" size="md" />
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.slice(0, 4).map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-charcoal bg-palelime/80 border-b-2 border-primary'
                      : 'text-secgray hover:text-charcoal hover:bg-lightgray'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Items (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/saved"
              className="relative p-2 text-secgray hover:text-charcoal hover:bg-lightgray rounded-full transition-colors"
              title="Saved Properties"
            >
              <Heart className="w-5 h-5" />
              {savedIds.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-charcoal font-bold text-[10px] rounded-full flex items-center justify-center shadow-sm">
                  {savedIds.length}
                </span>
              )}
            </Link>

            <Link
              to="/dashboard"
              className="p-2 text-secgray hover:text-charcoal hover:bg-lightgray rounded-full transition-colors"
              title="Dashboard & Profile"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              onClick={() => navigate('/valuation')}
              className="bg-primary hover:bg-primary-hover text-charcoal font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm flex items-center gap-2 hover:shadow"
            >
              <Calculator className="w-4 h-4 text-charcoal" />
              Get Valuation
            </button>
          </div>

          {/* Mobile Menu Button & Mobile CTA */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => navigate('/valuation')}
              className="bg-primary text-charcoal font-bold text-xs px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5" />
              Valuation
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-secgray hover:text-charcoal hover:bg-lightgray transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-palelime text-charcoal font-bold'
                      : 'text-secgray hover:bg-lightgray hover:text-charcoal'
                  }`
                }
              >
                <IconComponent className="w-5 h-5 text-secgray" />
                {link.name}
              </NavLink>
            );
          })}

          <div className="pt-3 border-t border-gray-100 space-y-2">
            <Link
              to="/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-secgray hover:bg-lightgray"
            >
              <span className="flex items-center gap-3">
                <Heart className="w-5 h-5" /> Saved Properties
              </span>
              {savedIds.length > 0 && (
                <span className="bg-primary text-charcoal font-bold text-xs px-2.5 py-0.5 rounded-full">
                  {savedIds.length}
                </span>
              )}
            </Link>

            <Link
              to="/history"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-secgray hover:bg-lightgray"
            >
              <History className="w-5 h-5" /> Valuation History
            </Link>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/valuation');
                }}
                className="w-full bg-primary hover:bg-primary-hover text-charcoal font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow"
              >
                <Calculator className="w-5 h-5" />
                Get Free Valuation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
