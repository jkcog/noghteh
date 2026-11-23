import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DotFamilyIntro } from './DotFamilyIntro';
import { LETTERS } from '../letterShaping';

describe('DotFamilyIntro', () => {
  it('shows a base shape and every dotted letter for both families', () => {
    const { container } = render(<DotFamilyIntro onClose={() => {}} />);

    const bases = container.querySelectorAll('.family-base .preview-char');
    expect(Array.from(bases).map((el) => el.textContent)).toEqual([
      LETTERS['ب'].base,
      LETTERS['ح'].base,
    ]);

    const familyLetterGroups = container.querySelectorAll('.family-letters');
    expect(familyLetterGroups.length).toBe(2);
    expect(
      Array.from(familyLetterGroups[0].querySelectorAll('.preview-char')).map(
        (el) => el.textContent,
      ),
    ).toEqual(['ب', 'پ', 'ت', 'ث']);
    expect(
      Array.from(familyLetterGroups[1].querySelectorAll('.preview-char')).map(
        (el) => el.textContent,
      ),
    ).toEqual(['ح', 'ج', 'چ', 'خ']);
  });

  it('renders the correct number of dots for a letter with dots above', () => {
    render(<DotFamilyIntro onClose={() => {}} />);

    const preview = screen.getByText('ت').closest('.letter-preview');
    const dots = preview.querySelectorAll('.dot');
    expect(dots.length).toBe(LETTERS['ت'].top);
  });

  it('renders no dots for a letter with none, like the bare ح shape', () => {
    const { container } = render(<DotFamilyIntro onClose={() => {}} />);

    const [, hahGroup] = container.querySelectorAll('.family-letters');
    const hahPreview = hahGroup.querySelector('.letter-preview');
    expect(hahPreview.querySelectorAll('.dot, .cluster').length).toBe(0);
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<DotFamilyIntro onClose={onClose} />);

    fireEvent.click(screen.getByText('Got it'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the overlay backdrop is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(<DotFamilyIntro onClose={onClose} />);

    fireEvent.click(container.querySelector('.family-intro-overlay'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the card', () => {
    const onClose = vi.fn();
    const { container } = render(<DotFamilyIntro onClose={onClose} />);

    fireEvent.click(container.querySelector('.family-intro-card'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
