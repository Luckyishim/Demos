import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { ShieldCheck, MapPin, Mail, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-2.5 rounded-xl inline-block">
              <Logo variant="full" size="md" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              MeroGhar is Nepal's premier data-driven property valuation platform. Empowering home buyers, sellers, lenders, and investors with smart real estate valuation insights.
            </p>
            <div className="flex items-center gap-2 text-xs text-lime-400 bg-gray-900 px-3 py-2 rounded-lg border border-gray-800 w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Independent Deterministic Valuation Engine</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base text-white mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/properties" className="hover:text-primary transition-colors">Property Search</Link></li>
              <li><Link to="/valuation" className="hover:text-primary transition-colors">Free Valuation Tool</Link></li>
              <li><Link to="/market-insights" className="hover:text-primary transition-colors">Market Insights</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">User Dashboard</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-bold text-base text-white mb-4">Coverage Areas</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/properties?district=Kathmandu" className="hover:text-primary transition-colors">Kathmandu Valley</Link></li>
              <li><Link to="/properties?district=Lalitpur" className="hover:text-primary transition-colors">Lalitpur City</Link></li>
              <li><Link to="/properties?district=Bhaktapur" className="hover:text-primary transition-colors">Bhaktapur District</Link></li>
              <li><Link to="/properties?district=Kaski" className="hover:text-primary transition-colors">Pokhara Metropolitan</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-bold text-base text-white mb-4">Contact MeroGhar</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>New Baneshwor, Kathmandu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+977 1 4450000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@meroghar.np</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} MeroGhar Technologies Pvt. Ltd. All rights reserved. Demo Valuation Engine for Nepal.
          </p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
            <span>for Nepalese Real Estate</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
