import React from 'react';

interface TopNavProps {
  title: string;
  showBackButton: boolean;
  onBackClick?: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ title, showBackButton, onBackClick }) => {
  return (
    <div className="top-nav">
      <div className="nav-content">
        {/* 左侧：返回按钮 */}
        <div className="nav-left">
          {showBackButton ? (
            <button 
              className="back-button"
              onClick={onBackClick}
            >
              ←
            </button>
          ) : (
            <div style={{ width: '40px' }}></div>
          )}
        </div>

        {/* 中间：页面标题 */}
        <div className="nav-center">
          <h1 className="nav-title">{title}</h1>
        </div>

        {/* 右侧：占位保持对称 */}
        <div className="nav-right">
          <div style={{ width: '40px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;