import { render, screen } from '@testing-library/react';
import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  const defaultProps = {
    x: 100,
    y: 50,
    content: 'Test tooltip content',
    visible: true,
  };

  test('should render tooltip when visible is true', () => {
    render(<Tooltip {...defaultProps} />);
    
    const tooltip = screen.getByText('Test tooltip content');
    expect(tooltip).toBeInTheDocument();
  });

  test('should not render tooltip when visible is false', () => {
    render(<Tooltip {...defaultProps} visible={false} />);
    
    expect(screen.queryByText('Test tooltip content')).not.toBeInTheDocument();
  });

  test('should position tooltip correctly', () => {
    render(<Tooltip {...defaultProps} />);
    
    const tooltip = screen.getByText('Test tooltip content');
    expect(tooltip).toHaveStyle({
      left: '110px', // x + 10
      top: '22px',   // y - 28
    });
  });

  test('should render HTML content', () => {
    const { container } = render(
      <Tooltip 
        {...defaultProps} 
        content="<strong>Bold</strong> text" 
      />
    );
    
    const strongElement = container.querySelector('strong');
    expect(strongElement).toBeInTheDocument();
    expect(strongElement?.textContent).toBe('Bold');
  });

  test('should have correct opacity when visible', () => {
    render(<Tooltip {...defaultProps} />);
    
    const tooltip = screen.getByText('Test tooltip content');
    expect(tooltip).toHaveStyle({ opacity: '0.9' });
  });
});