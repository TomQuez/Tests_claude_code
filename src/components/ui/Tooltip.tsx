import React from 'react';
import styles from '../../styles/Tooltip.module.css';

interface TooltipProps {
  x: number;
  y: number;
  content: string;
  visible: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({ x, y, content, visible }) => {
  if (!visible) return null;

  return (
    <div
      className={styles.tooltip}
      style={{
        left: x + 10,
        top: y - 28,
        opacity: visible ? 0.9 : 0,
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};