import React, { useState } from 'react';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import type { UserData, StoreItem } from '../types';

interface StorePageProps {
  userData: UserData;
  onPurchaseItem: (itemId: string) => void;
  onApplyItem: (itemId: string) => void;
  onNavigate: (page: 'home' | 'budget' | 'store') => void;
  currentPage: 'home' | 'budget' | 'store';
}

const StorePage: React.FC<StorePageProps> = ({ 
  userData, 
  onPurchaseItem, 
  onApplyItem, 
  onNavigate,
  currentPage 
}) => {
  const [activeTab, setActiveTab] = useState<'available' | 'purchased'>('available');

  const availableItems = userData.storeItems.filter(item => 
    !item.isPurchased && item.requiredLevel <= userData.level
  );

  const purchasedItems = userData.storeItems.filter(item => item.isPurchased);

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'background': return '🎨';
      case 'theme': return '💖';
      default: return '🎁';
    }
  };

  const renderItem = (item: StoreItem, index: number, array: StoreItem[]) => (
    <div key={item.id} style={{
      border: '2px solid var(--light-pink)',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: index === array.length - 1 ? '0' : '15px',
      background: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <div>
          <span style={{ fontSize: '24px', marginRight: '15px' }}>{getItemIcon(item.type)}</span>
          <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</span>
        </div>
        <span style={{ color: 'var(--text-light)', fontSize: '16px', fontWeight: 'bold' }}>
          {item.price} 积分
        </span>
      </div>
      
      <div style={{ fontSize: '13px', color: 'var(--text-light)', marginBottom: '15px' }}>
        需要等级: {item.requiredLevel}
      </div>
      
      {!item.isPurchased ? (
        <button
          onClick={() => onPurchaseItem(item.id)}
          disabled={userData.totalPoints < item.price || userData.level < item.requiredLevel}
          style={{
            width: '100%',
            padding: '12px',
            background: userData.totalPoints >= item.price && userData.level >= item.requiredLevel 
              ? 'var(--primary-pink)' 
              : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: userData.totalPoints >= item.price && userData.level >= item.requiredLevel 
              ? 'pointer' 
              : 'not-allowed'
          }}
        >
          {userData.totalPoints < item.price ? '积分不足' : 
           userData.level < item.requiredLevel ? '等级不足' : '购买'}
        </button>
      ) : (
        <button
          onClick={() => onApplyItem(item.id)}
          style={{
            width: '100%',
            padding: '12px',
            background: item.isApplied ? 'var(--success)' : 'var(--primary-pink)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {item.isApplied ? '已应用' : '应用'}
        </button>
      )}
    </div>
  );

  return (
    <div className="app">
      <div className="page-container">
        {/* 统一顶部导航栏 */}
        <TopNav 
          title="小猪商店" 
          showBackButton={false}
        />

        {/* 主要内容区域（可滚动） */}
        <div className="page-content">
          {/* 用户信息 */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '15px',
            marginBottom: '20px',
            textAlign: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '5px' }}>
              当前积分和等级
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-dark)' }}>
                  {userData.totalPoints}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>积分</div>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'var(--light-pink)' }}></div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-dark)' }}>
                  {userData.level}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>等级</div>
              </div>
            </div>
          </div>

          {/* 标签页 */}
          <div style={{ 
            display: 'flex', 
            marginBottom: '20px',
            background: 'white',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <button
              onClick={() => setActiveTab('available')}
              style={{
                flex: 1,
                padding: '15px',
                background: activeTab === 'available' ? 'var(--primary-pink)' : 'transparent',
                color: activeTab === 'available' ? 'white' : 'var(--text-light)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              可购买 ({availableItems.length})
            </button>
            <button
              onClick={() => setActiveTab('purchased')}
              style={{
                flex: 1,
                padding: '15px',
                background: activeTab === 'purchased' ? 'var(--primary-pink)' : 'transparent',
                color: activeTab === 'purchased' ? 'white' : 'var(--text-light)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              已购买 ({purchasedItems.length})
            </button>
          </div>

          {/* 商品列表 */}
          {activeTab === 'available' ? (
            availableItems.length > 0 ? (
              availableItems.map((item, index, array) => renderItem(item, index, array))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                color: 'var(--text-light)', 
                padding: '40px 20px',
                fontSize: '14px'
              }}>
                🎁 暂无可用商品
              </div>
            )
          ) : (
            purchasedItems.length > 0 ? (
              purchasedItems.map((item, index, array) => renderItem(item, index, array))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                color: 'var(--text-light)', 
                padding: '40px 20px',
                fontSize: '14px'
              }}>
                🛍️ 暂无已购商品
              </div>
            )
          )}
        </div>

        {/* 统一底部菜单 */}
        <BottomNav 
          currentPage={currentPage}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default StorePage;