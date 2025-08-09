import React from 'react';
import styles from '../../styles/Controls.module.css';

interface ControlsProps {
  onGenerateData: () => void;
  onAnimate: () => void;
  onToggleTheme: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  onGenerateData,
  onAnimate,
  onToggleTheme,
}) => {
  return (
    <div className={styles.controls}>
      <button onClick={onGenerateData}>
        🎲 Generate New Data
      </button>
      <button onClick={onAnimate}>
        ✨ Animate
      </button>
      <button onClick={onToggleTheme}>
        🎨 Toggle Theme
      </button>
    </div>
  );
};