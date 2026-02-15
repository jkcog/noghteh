import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Inventory } from './Inventory';

describe('Inventory Component', () => {
  it('should render the correct number of total and used dots', () => {
    const { container } = render(
      <Inventory totalAllowance={5} dotsRemaining={2} />,
    );

    const dots = container.getElementsByClassName('inv-dot');
    expect(dots.length).toBe(5);

    const usedDots = container.getElementsByClassName('used');
    expect(usedDots.length).toBe(3);
  });
});
