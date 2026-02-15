import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DotCluster } from './DotCluster';

describe('DotCluster Component', () => {
  it('should render nothing when count is 0', () => {
    const { container } = render(<DotCluster count={0} position="top" />);
    expect(container.firstChild).toBeNull();
  });

  it('should render individual dots for count 1 or 2', () => {
    const { container } = render(<DotCluster count={2} position="top" />);

    const dots = container.getElementsByClassName('dot');
    expect(dots.length).toBe(2);
  });

  it('should render a cluster for count 3', () => {
    const { container } = render(<DotCluster count={3} position="top" />);

    const cluster = container.getElementsByClassName('cluster');
    expect(cluster.length).toBe(1);

    const dots = container.getElementsByClassName('cluster-dot');
    expect(dots.length).toBe(3);
  });
});
