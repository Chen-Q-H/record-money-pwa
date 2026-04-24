import React, { useState } from 'react';
import type { UserData, StoreItem } from '../types';

interface StoreModalProps {
  userData: UserData;
  onPurchaseItem: (itemId: string) => void;
  onApplyItem: (itemId: string) => void;
  onClose: () => void;
}

const StoreModal: React.FC<StoreModalProps> = ({ 
  userData, 
  onPurchaseItem, 
  onApplyItem, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'available' | 'purchased'>('available');

  const availableItems = userData.storeItems.filter(item => 
    !item.isPurchased && item.requiredLevel <= userData.level
  );

  const purchasedItems = userData.storeItems.filter(item => item.isPurchased);

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'sticker': return '🐷';
      case 'background': return '🎨';
      case 'theme': return '💖';
      default: return '🎁';
    }
  };

  const renderItem = (item: StoreItem) => (
    <div key={item.id} style={{
      border: '2px solid var(--light-pink)',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '10px',
      background: 'white'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div>
          <span style={{ fontSize: '20px', marginRight: '10px' }}>{getItemIcon(item.type)}</span>
          <span style={{ fontWeight: 'bold' }}>{item.name}</span>
        </div>
        <span style={{ color: 'var(--text-light)' }}>{item.price} 积分</span>
      </div>
      
      <div style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '10px' }}>
        需要等级: {item.requiredLevel}
      </div>
      
      {!item.isPurchased ? (
        <button
          onClick={() => onPurchaseItem(item.id)}
          disabled={userData.totalPoints < item.price || userData.level < item.requiredLevel}
          style={{
            width: '100%',
            padding: '8px',
            background: userData.totalPoints >= item.price && userData.level >= item.requiredLevel 
              ? 'var(--primary-pink)' 
              : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
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
            padding: '8px',
            background: item.isApplied ? 'var(--success)' : 'var(--primary-pink)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {item.isApplied ? '已应用' : '应用'}
        </button>
      )}
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}>
          <h3 style={{ margin: 0 }}>小猪商店</h3>
          <button 
            onClick={onClose}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '20px', 
              cursor: 'pointer',
              color: 'var(--text-light)'
            }}
          >
            ×
          </button>
        </div>
        
        <div style={{ 
          display: 'flex', 
          marginBottom: '20px',
          borderBottom: '1px solid var(--light-pink)'
        }}>
          <button
            onClick={() => setActiveTab('available')}
            style={{
              flex: 1,
              padding: '10px',
              background: activeTab === 'available' ? 'var(--primary-pink)' : 'transparent',
              color: activeTab === 'available' ? 'white' : 'var(--text-light)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            可购买 ({availableItems.length})
          </button>
          <button
            onClick={() => setActiveTab('purchased')}
            style={{
              flex: 1,
              padding: '10px',
              background: activeTab === 'purchased' ? 'var(--primary-pink)' : 'transparent',
              color: activeTab === 'purchased' ? 'white' : 'var(--text-light)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            已购买 ({purchasedItems.length})
          </button>
        </div>
        
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {activeTab === 'available' ? (
            availableItems.length > 0 ? (
              availableItems.map(renderItem)
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-light)', padding: '20px' }}>
                暂无可用商品
              </div>
            )
          ) : (
            purchasedItems.length > 0 ? (
              purchasedItems.map(renderItem)
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-light)', padding: '20px' }}>
                暂无已购商品
              </div>
            )
          )}
        </div>
        
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          background: 'var(--cream)', 
          borderRadius: '5px',
          fontSize: '12px',
          color: 'var(--text-light)'
        }}>
          当前积分: {userData.totalPoints} | 当前等级: {userData.level}
        </div>
      </div>
    </div>
  );
};

export default StoreModal;