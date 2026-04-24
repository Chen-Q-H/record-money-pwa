import React from 'react';

interface BottomNavProps {
  currentPage: 'home' | 'budget' | 'store' | 'expenses';
  onNavigate: (page: 'home' | 'budget' | 'store' | 'expenses') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { key: 'home', icon: '🏠', label: '首页', active: currentPage === 'home' },
    { key: 'budget', icon: '💰', label: '预算', active: currentPage === 'budget' },
    { key: 'expenses', icon: '📊', label: '花销', active: currentPage === 'expenses' },
    { key: 'store', icon: '🏪', label: '商店', active: currentPage === 'store' },
  ];

  return (
    <div className="bottom-nav">
      <div className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${item.active ? 'active' : ''}`}
            onClick={() => onNavigate(item.key as 'home' | 'budget' | 'store')}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;