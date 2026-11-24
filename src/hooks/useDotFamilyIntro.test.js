import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useDotFamilyIntro } from './useDotFamilyIntro';

describe('useDotFamilyIntro', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('opens automatically on a first visit', () => {
    const { result } = renderHook(() => useDotFamilyIntro());
    expect(result.current.isIntroOpen).toBe(true);
  });

  it('stays closed on a later visit once dismissed', () => {
    window.localStorage.setItem('noghteh_seen_family_intro', 'true');

    const { result } = renderHook(() => useDotFamilyIntro());
    expect(result.current.isIntroOpen).toBe(false);
  });

  it('persists the seen flag to localStorage when closed', () => {
    const { result } = renderHook(() => useDotFamilyIntro());

    act(() => {
      result.current.closeIntro();
    });

    expect(result.current.isIntroOpen).toBe(false);
    expect(window.localStorage.getItem('noghteh_seen_family_intro')).toBe(
      'true',
    );
  });

  it('can be reopened without clearing the seen flag', () => {
    window.localStorage.setItem('noghteh_seen_family_intro', 'true');
    const { result } = renderHook(() => useDotFamilyIntro());

    act(() => {
      result.current.openIntro();
    });

    expect(result.current.isIntroOpen).toBe(true);
    expect(window.localStorage.getItem('noghteh_seen_family_intro')).toBe(
      'true',
    );
  });
});
