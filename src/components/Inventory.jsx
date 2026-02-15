export const Inventory = ({ totalAllowance, dotsRemaining }) => {
  return (
    <div className="inventory">
      {Array(totalAllowance)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`inv-dot ${i < dotsRemaining ? '' : 'used'}`}
          />
        ))}
    </div>
  );
};
