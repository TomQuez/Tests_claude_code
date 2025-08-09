import { useState } from 'react';
import styles from '../../styles/Calculator.module.css';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>
        {display}
      </div>
      <div className={styles.buttons}>
        <button className={styles.clear} onClick={clear}>
          C
        </button>
        <button className={styles.operation} onClick={() => inputOperation('/')}>
          ÷
        </button>
        <button className={styles.operation} onClick={() => inputOperation('*')}>
          ×
        </button>
        <button className={styles.operation} onClick={() => inputOperation('-')}>
          −
        </button>
        <button className={styles.number} onClick={() => inputNumber('7')}>
          7
        </button>
        <button className={styles.number} onClick={() => inputNumber('8')}>
          8
        </button>
        <button className={styles.number} onClick={() => inputNumber('9')}>
          9
        </button>
        <button className={styles.operation} onClick={() => inputOperation('+')}>
          +
        </button>
        <button className={styles.number} onClick={() => inputNumber('4')}>
          4
        </button>
        <button className={styles.number} onClick={() => inputNumber('5')}>
          5
        </button>
        <button className={styles.number} onClick={() => inputNumber('6')}>
          6
        </button>
        <button className={styles.number} onClick={() => inputNumber('1')}>
          1
        </button>
        <button className={styles.number} onClick={() => inputNumber('2')}>
          2
        </button>
        <button className={styles.number} onClick={() => inputNumber('3')}>
          3
        </button>
        <button className={styles.equals} onClick={performCalculation}>
          =
        </button>
        <button className={`${styles.number} ${styles.zero}`} onClick={() => inputNumber('0')}>
          0
        </button>
        <button className={styles.number} onClick={() => inputNumber('.')}>
          .
        </button>
      </div>
    </div>
  );
}