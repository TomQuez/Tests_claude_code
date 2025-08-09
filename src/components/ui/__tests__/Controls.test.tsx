import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Controls } from '../Controls';

describe('Controls', () => {
  const mockProps = {
    onGenerateData: vi.fn(),
    onAnimate: vi.fn(),
    onToggleTheme: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render all control buttons', () => {
    render(<Controls {...mockProps} />);
    
    expect(screen.getByText('🎲 Generate New Data')).toBeInTheDocument();
    expect(screen.getByText('✨ Animate')).toBeInTheDocument();
    expect(screen.getByText('🎨 Toggle Theme')).toBeInTheDocument();
  });

  test('should call onGenerateData when Generate New Data button is clicked', async () => {
    const user = userEvent.setup();
    render(<Controls {...mockProps} />);
    
    await user.click(screen.getByText('🎲 Generate New Data'));
    
    expect(mockProps.onGenerateData).toHaveBeenCalledTimes(1);
  });

  test('should call onAnimate when Animate button is clicked', async () => {
    const user = userEvent.setup();
    render(<Controls {...mockProps} />);
    
    await user.click(screen.getByText('✨ Animate'));
    
    expect(mockProps.onAnimate).toHaveBeenCalledTimes(1);
  });

  test('should call onToggleTheme when Toggle Theme button is clicked', async () => {
    const user = userEvent.setup();
    render(<Controls {...mockProps} />);
    
    await user.click(screen.getByText('🎨 Toggle Theme'));
    
    expect(mockProps.onToggleTheme).toHaveBeenCalledTimes(1);
  });

  test('should handle multiple button clicks', async () => {
    const user = userEvent.setup();
    render(<Controls {...mockProps} />);
    
    await user.click(screen.getByText('🎲 Generate New Data'));
    await user.click(screen.getByText('🎨 Toggle Theme'));
    await user.click(screen.getByText('✨ Animate'));
    
    expect(mockProps.onGenerateData).toHaveBeenCalledTimes(1);
    expect(mockProps.onToggleTheme).toHaveBeenCalledTimes(1);
    expect(mockProps.onAnimate).toHaveBeenCalledTimes(1);
  });
});