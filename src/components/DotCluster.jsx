export const DotCluster = ({ count, position }) => {
  if (count === 0) return null;

  if (count === 3) {
    const isTop = position === 'top';
    return (
      <div className="cluster">
        {isTop ? (
          <>
            <div
              className="cluster-dot"
              style={{
                top: 0,
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
              }}
            />
            <div className="cluster-dot" style={{ bottom: 0, left: 0 }} />
            <div className="cluster-dot" style={{ bottom: 0, right: 0 }} />
          </>
        ) : (
          <>
            <div className="cluster-dot" style={{ top: 0, left: 0 }} />
            <div className="cluster-dot" style={{ top: 0, right: 0 }} />
            <div
              className="cluster-dot"
              style={{
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
              }}
            />
          </>
        )}
      </div>
    );
  }

  return Array(count)
    .fill(0)
    .map((_, i) => <div key={i} className="dot"></div>);
};
