import React from 'react';

interface CropSvgProps {
  type: 'carrot' | 'tomato' | 'corn';
  stage: 1 | 2 | 3;
  size?: number;
  className?: string;
}

const CropSvg: React.FC<CropSvgProps> = ({ type, stage, size = 40, className = '' }) => {
  const svgProps = {
    width: size,
    height: size,
    viewBox: '0 0 40 40',
    className: `crop-svg ${className}`
  };

  // 胡萝卜SVG图案 - 精美版
  const renderCarrot = (stage: number) => {
    switch (stage) {
      case 1: // 胡萝卜幼苗
        return (
          <g>
            {/* 土壤 */}
            <ellipse cx="20" cy="32" rx="10" ry="4" fill="#A0826D" opacity="0.6"/>
            <ellipse cx="20" cy="31" rx="8" ry="3" fill="#8B6914" opacity="0.4"/>
            {/* 茎 */}
            <line x1="20" y1="32" x2="20" y2="12" stroke="#558B2F" strokeWidth="2.5" strokeLinecap="round"/>
            {/* 左叶 */}
            <path d="M20 16 Q14 8 10 4" stroke="#558B2F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 16 Q15 10 13 7" stroke="#7CB342" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M20 16 Q16 11 15 8" stroke="#8BC34A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            {/* 右叶 */}
            <path d="M20 16 Q26 8 30 4" stroke="#558B2F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 16 Q25 10 27 7" stroke="#7CB342" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M20 16 Q24 11 25 8" stroke="#8BC34A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </g>
        );
      case 2: // 胡萝卜成长
        return (
          <g>
            {/* 胡萝卜身体雏形 */}
            <ellipse cx="20" cy="22" rx="5" ry="10" fill="#FF8C42"/>
            <ellipse cx="19" cy="20" rx="2" ry="6" fill="#FFAB40" opacity="0.5"/>
            {/* 根部须 */}
            <path d="M18 32 Q16 34 15 35" stroke="#8B6914" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M22 32 Q24 34 25 35" stroke="#8B6914" strokeWidth="1" fill="none" strokeLinecap="round"/>
            {/* 叶子 */}
            <path d="M20 12 Q14 6 11 3" stroke="#558B2F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 12 Q17 5 17 2" stroke="#7CB342" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 12 Q24 6 29 3" stroke="#558B2F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 12 Q23 5 23 2" stroke="#7CB342" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </g>
        );
      case 3: // 胡萝卜成熟
        return (
          <g>
            {/* 胡萝卜身体 */}
            <ellipse cx="20" cy="22" rx="6" ry="12" fill="#FF6B35"/>
            <ellipse cx="18.5" cy="20" rx="2.5" ry="8" fill="#FFAB40" opacity="0.4"/>
            {/* 身体纹理 */}
            <path d="M18 12 Q17 20 17 28" stroke="#E55A2C" strokeWidth="0.8" opacity="0.5"/>
            <path d="M20 10 Q20 18 20 28" stroke="#E55A2C" strokeWidth="0.8" opacity="0.5"/>
            <path d="M22 12 Q23 20 23 28" stroke="#E55A2C" strokeWidth="0.8" opacity="0.5"/>
            {/* 根部须 */}
            <path d="M17 34 Q15 36 13 38" stroke="#8B6914" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M23 34 Q25 36 27 38" stroke="#8B6914" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M20 34 Q20 37 20 39" stroke="#8B6914" strokeWidth="1" fill="none" strokeLinecap="round"/>
            {/* 叶子 */}
            <path d="M20 10 Q13 4 9 1" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M20 10 Q16 3 16 0" stroke="#66BB6A" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 10 Q27 4 31 1" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M20 10 Q24 3 24 0" stroke="#66BB6A" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 10 Q20 4 20 0" stroke="#81C784" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          </g>
        );
      default:
        return null;
    }
  };

  // 番茄SVG图案 - 精美版
  const renderTomato = (stage: number) => {
    switch (stage) {
      case 1: // 番茄幼苗
        return (
          <g>
            {/* 土壤 */}
            <ellipse cx="20" cy="32" rx="10" ry="4" fill="#A0826D" opacity="0.6"/>
            <ellipse cx="20" cy="31" rx="8" ry="3" fill="#8B6914" opacity="0.4"/>
            {/* 茎 */}
            <line x1="20" y1="32" x2="20" y2="12" stroke="#558B2F" strokeWidth="2.5" strokeLinecap="round"/>
            {/* 左叶 */}
            <path d="M20 16 Q12 8 8 4" stroke="#558B2F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 16 Q14 10 11 7" stroke="#7CB342" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M20 16 Q15 11 13 8" stroke="#8BC34A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            {/* 右叶 */}
            <path d="M20 16 Q28 8 32 4" stroke="#558B2F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 16 Q26 10 29 7" stroke="#7CB342" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M20 16 Q25 11 27 8" stroke="#8BC34A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </g>
        );
      case 2: // 番茄成长
        return (
          <g>
            {/* 绿色萼片 */}
            <path d="M20 16 L15 15 L16 12 L18 13 L20 11 L22 13 L24 12 L25 15 Z" fill="#558B2F"/>
            <path d="M20 11 L20 8" stroke="#6B9E3E" strokeWidth="2" strokeLinecap="round"/>
            {/* 番茄果实雏形 */}
            <circle cx="20" cy="23" r="8" fill="#E53935"/>
            <ellipse cx="17" cy="20" rx="2" ry="1.5" fill="#FF8A80" opacity="0.5"/>
            {/* 小叶子 */}
            <path d="M20 8 Q15 5 13 3" stroke="#6B9E3E" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M20 8 Q25 5 27 3" stroke="#6B9E3E" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          </g>
        );
      case 3: // 番茄成熟
        return (
          <g>
            {/* 番茄果实阴影 */}
            <ellipse cx="22" cy="26" rx="8" ry="7" fill="#B71C1C" opacity="0.3"/>
            {/* 番茄果实 */}
            <circle cx="20" cy="24" r="10" fill="#F44336"/>
            {/* 高光 */}
            <ellipse cx="16" cy="20" rx="3" ry="2" fill="#FFFFFF" opacity="0.5"/>
            <ellipse cx="18" cy="22" rx="1.5" ry="1" fill="#FF8A80" opacity="0.6"/>
            {/* 绿色萼片 */}
            <path d="M20 14 L12 17 L14 14 L13 11 L17 13 L20 10 L23 13 L27 11 L26 14 L28 17 Z" fill="#4CAF50"/>
            <path d="M20 10 L20 7" stroke="#558B2F" strokeWidth="2" strokeLinecap="round"/>
            {/* 小叶子 */}
            <path d="M20 7 Q15 3 13 1" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 7 Q25 3 27 1" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 7 Q20 2 20 0" stroke="#66BB6A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </g>
        );
      default:
        return null;
    }
  };

  // 玉米SVG图案 - 精美版
  const renderCorn = (stage: number) => {
    switch (stage) {
      case 1: // 玉米幼苗
        return (
          <g>
            {/* 土壤 */}
            <ellipse cx="20" cy="32" rx="10" ry="4" fill="#A0826D" opacity="0.6"/>
            <ellipse cx="20" cy="31" rx="8" ry="3" fill="#8B6914" opacity="0.4"/>
            {/* 茎 */}
            <line x1="20" y1="32" x2="20" y2="12" stroke="#558B2F" strokeWidth="2.5" strokeLinecap="round"/>
            {/* 细长苗叶 */}
            <path d="M20 16 Q10 6 7 2" stroke="#558B2F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 16 Q13 9 11 6" stroke="#7CB342" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M20 16 Q30 6 33 2" stroke="#558B2F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 16 Q27 9 29 6" stroke="#7CB342" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          </g>
        );
      case 2: // 玉米成长
        return (
          <g>
            {/* 外皮 */}
            <path d="M14 26 Q11 18 14 13 Q15 11 17 10" fill="#7CB342" opacity="0.7"/>
            <path d="M26 26 Q29 18 26 13 Q25 11 23 10" fill="#7CB342" opacity="0.7"/>
            {/* 玉米棒雏形 */}
            <ellipse cx="20" cy="22" rx="5" ry="9" fill="#FFD54F"/>
            {/* 玉米粒纹理 */}
            <line x1="18" y1="15" x2="18" y2="29" stroke="#FFB74D" strokeWidth="0.5" opacity="0.5"/>
            <line x1="20" y1="14" x2="20" y2="30" stroke="#FFB74D" strokeWidth="0.5" opacity="0.5"/>
            <line x1="22" y1="15" x2="22" y2="29" stroke="#FFB74D" strokeWidth="0.5" opacity="0.5"/>
            {/* 顶部叶子 */}
            <path d="M17 10 Q14 5 12 3" stroke="#558B2F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M23 10 Q26 5 28 3" stroke="#558B2F" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </g>
        );
      case 3: // 玉米成熟
        return (
          <g>
            {/* 外层皮 */}
            <path d="M13 28 Q10 20 13 14 Q14 12 16 11" fill="#66BB6A" opacity="0.7"/>
            <path d="M27 28 Q30 20 27 14 Q26 12 24 11" fill="#66BB6A" opacity="0.7"/>
            <path d="M13 28 Q12 32 15 35" fill="#558B2F" opacity="0.6"/>
            <path d="M27 28 Q28 32 25 35" fill="#558B2F" opacity="0.6"/>
            {/* 内层皮 */}
            <path d="M15 26 Q13 20 16 15 Q17 13 18 12" fill="#8BC34A" opacity="0.5"/>
            <path d="M25 26 Q27 20 24 15 Q23 13 22 12" fill="#8BC34A" opacity="0.5"/>
            {/* 玉米棒 */}
            <ellipse cx="20" cy="24" rx="6" ry="10" fill="#FFC107"/>
            {/* 玉米粒竖纹 */}
            <line x1="17" y1="16" x2="17" y2="32" stroke="#FFB300" strokeWidth="0.6" opacity="0.7"/>
            <line x1="19" y1="15" x2="19" y2="33" stroke="#FFB300" strokeWidth="0.6" opacity="0.7"/>
            <line x1="21" y1="15" x2="21" y2="33" stroke="#FFB300" strokeWidth="0.6" opacity="0.7"/>
            <line x1="23" y1="16" x2="23" y2="32" stroke="#FFB300" strokeWidth="0.6" opacity="0.7"/>
            {/* 玉米粒横纹 */}
            <line x1="15" y1="19" x2="25" y2="19" stroke="#FFB300" strokeWidth="0.6" opacity="0.7"/>
            <line x1="15" y1="23" x2="25" y2="23" stroke="#FFB300" strokeWidth="0.6" opacity="0.7"/>
            <line x1="15" y1="27" x2="25" y2="27" stroke="#FFB300" strokeWidth="0.6" opacity="0.7"/>
            <line x1="15" y1="31" x2="25" y2="31" stroke="#FFB300" strokeWidth="0.6" opacity="0.7"/>
            {/* 玉米粒高光点 */}
            <circle cx="18" cy="21" r="0.8" fill="#FFF59D" opacity="0.8"/>
            <circle cx="22" cy="25" r="0.8" fill="#FFF59D" opacity="0.8"/>
            <circle cx="18" cy="29" r="0.8" fill="#FFF59D" opacity="0.8"/>
            {/* 顶部叶子 */}
            <path d="M16 12 Q13 6 11 3" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M20 12 Q20 5 20 2" stroke="#66BB6A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M24 12 Q27 6 29 3" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M18 12 Q16 8 15 6" stroke="#7CB342" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M22 12 Q24 8 25 6" stroke="#7CB342" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </g>
        );
      default:
        return null;
    }
  };

  const renderSvgContent = () => {
    switch (type) {
      case 'carrot':
        return renderCarrot(stage);
      case 'tomato':
        return renderTomato(stage);
      case 'corn':
        return renderCorn(stage);
      default:
        return null;
    }
  };

  return (
    <svg {...svgProps}>
      {renderSvgContent()}
    </svg>
  );
};

export default CropSvg;
