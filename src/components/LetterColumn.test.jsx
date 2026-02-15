import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LetterColumn } from './LetterColumn';

describe('LetterColumn Component', () => {
  const mockLetter = { id: 10, char: 'A', bottomOffset: 5 };
  const mockBoardState = { top: 1, bottom: 0 };
  const mockHandleClick = vi.fn();
  const mockHandleRightClick = vi.fn();

  it('should render the character', () => {
    const { getByText } = render(
      <LetterColumn
        letter={mockLetter}
        index={0}
        boardStateForLetter={mockBoardState}
        handleZoneClick={mockHandleClick}
        handleRightClick={mockHandleRightClick}
      />,
    );

    expect(getByText('A')).toBeDefined();
  });

  it('should call handleZoneClick with correct params when top zone is clicked', () => {
    const { container } = render(
      <LetterColumn
        letter={mockLetter}
        index={0}
        boardStateForLetter={mockBoardState}
        handleZoneClick={mockHandleClick}
        handleRightClick={mockHandleRightClick}
      />,
    );

    const topZone = container.getElementsByClassName('top-zone')[0];

    fireEvent.click(topZone);

    expect(mockHandleClick).toHaveBeenCalledWith(10, 'top');
  });

  it('should call handleRightClick with correct params when bottom zone is right-clicked', () => {
    const { container } = render(
      <LetterColumn
        letter={mockLetter}
        index={0}
        boardStateForLetter={mockBoardState}
        handleZoneClick={mockHandleClick}
        handleRightClick={mockHandleRightClick}
      />,
    );

    const bottomZone = container.getElementsByClassName('bottom-zone')[0];

    fireEvent.contextMenu(bottomZone);

    expect(mockHandleRightClick).toHaveBeenCalledWith(
      expect.anything(),
      10,
      'bottom',
    );
  });
});
