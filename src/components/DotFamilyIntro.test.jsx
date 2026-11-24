import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DotFamilyIntro } from './DotFamilyIntro';
import { buildFamilies } from '../letterFamilies';
import { LETTERS } from '../letterShaping';

describe('buildFamilies', () => {
  it('groups every letter that shares a base shape with another letter', () => {
    const families = buildFamilies();

    // Every family has more than one member, and every member really does
    // share its base with the others in its family.
    families.forEach((family) => {
      expect(family.letters.length).toBeGreaterThan(1);
      family.letters.forEach((ch) => {
        expect(LETTERS[ch].base).toBe(family.base);
      });
    });

    // Nothing with a unique base shape (e.g. ل, م, ه), and nothing with an
    // endBase override (ن, ی — they only match the family shape in the
    // initial/medial position, not on their own), was swept into a family.
    const grouped = new Set(families.flatMap((f) => f.letters));
    Object.keys(LETTERS)
      .filter((ch) => !grouped.has(ch) && !LETTERS[ch].endBase)
      .forEach((ch) => {
        const basesSharedByOthers = Object.keys(LETTERS).filter(
          (other) => other !== ch && LETTERS[other].base === LETTERS[ch].base,
        );
        expect(basesSharedByOthers).toEqual([]);
      });
    expect(grouped.has('ن')).toBe(false);
    expect(grouped.has('ی')).toBe(false);

    // Known families are present with every member, and nothing extra.
    expect(families.find((f) => f.letters.includes('ب')).letters).toEqual([
      'ب',
      'پ',
      'ت',
      'ث',
    ]);
    expect(families.find((f) => f.letters.includes('ح')).letters).toEqual(
      expect.arrayContaining(['ح', 'ج', 'چ', 'خ']),
    );
  });
});

describe('DotFamilyIntro', () => {
  it('opens on a welcome slide that introduces the app, not a letter family', () => {
    render(<DotFamilyIntro onClose={() => {}} />);

    expect(screen.getByText('Welcome to Noghteh')).toBeTruthy();
    expect(screen.getByText(/place the right dots/i)).toBeTruthy();
    expect(screen.queryByText('One Shape, Many Letters')).toBeNull();
    expect(screen.queryByText('Back')).toBeNull();
  });

  it('steps through every letter family exactly once, in order, after the welcome slide', () => {
    const families = buildFamilies();
    const { container } = render(<DotFamilyIntro onClose={() => {}} />);

    families.forEach((family) => {
      fireEvent.click(screen.getByText('Next'));

      expect(screen.getByText('One Shape, Many Letters')).toBeTruthy();
      const base = container.querySelector('.family-base .preview-char').textContent;
      expect(base).toBe(family.base);
      const letters = Array.from(
        container.querySelectorAll('.family-letters .preview-char'),
      ).map((el) => el.textContent);
      expect(letters).toEqual(family.letters);
    });

    // After the last family, "Next" is replaced by "Got it".
    expect(screen.queryByText('Next')).toBeNull();
    expect(screen.getByText('Got it')).toBeTruthy();
  });

  it('shows only the letters themselves, with no dot overlay on top', () => {
    const { container } = render(<DotFamilyIntro onClose={() => {}} />);
    fireEvent.click(screen.getByText('Next'));

    expect(container.querySelectorAll('.dot, .cluster, .dot-cluster').length).toBe(0);
  });

  it('shows the latin sound under each family letter, but not under the base shape', () => {
    const { container } = render(<DotFamilyIntro onClose={() => {}} />);
    fireEvent.click(screen.getByText('Next'));

    const sounds = Array.from(
      container.querySelectorAll('.family-letters .preview-sound'),
    ).map((el) => el.textContent);
    expect(sounds).toEqual(['b', 'p', 't', 's']);
    expect(container.querySelector('.family-base .preview-sound')).toBeNull();
  });

  it('lets the user go back to the welcome slide', () => {
    render(<DotFamilyIntro onClose={() => {}} />);

    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('One Shape, Many Letters')).toBeTruthy();

    fireEvent.click(screen.getByText('Back'));
    expect(screen.getByText('Welcome to Noghteh')).toBeTruthy();
  });

  it('calls onClose when "Got it" is clicked on the last slide', () => {
    const onClose = vi.fn();
    render(<DotFamilyIntro onClose={onClose} />);

    buildFamilies().forEach(() => fireEvent.click(screen.getByText('Next')));
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
