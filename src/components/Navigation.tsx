import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'digital-archives', label: 'Digital Archives' },
    { id: 'ai-search', label: 'AI-Powered Search' },
    { id: 'cultural-calendar', label: 'Cultural Calendar' },
    { id: 'booking', label: 'Booking / Participation' },
    { id: 'travel-audiobook', label: 'Travel Audio Book' }, // Add this line
  ];

  const handleVrClick = () => {
    // Placeholder for VR functionality
    alert('VR experience would launch here');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-monastery rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">🏛️</span>
            </div>
            <span className="text-xl font-bold text-foreground">Sikkim Monasteries</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                onClick={() => onSectionChange(item.id)}
                className="text-sm font-medium"
              >
                {item.label}
              </Button>
            ))}
            
            {/* VR Button - Desktop */}
            <Button
              variant="outline"
              onClick={handleVrClick}
              className="text-sm font-medium ml-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <span className="mr-2">👓</span> VIEW IN VR
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-sm font-medium"
                >
                  {item.label}
                </Button>
              ))}
              
              {/* VR Button - Mobile */}
              <Button
                variant="outline"
                onClick={() => {
                  handleVrClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-sm font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <span className="mr-2">👓</span> VIEW IN VR
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;