import { CATEGORY_CONFIG } from '../wordList';
import { FireIcon, TrophyIcon } from './Icons/ScoreIcons';

export const CategoryToolbar = ({
  currentCategory,
  onSelectCategory,
  getCategoryStars,
  isCategoryUnlocked,
  streak,
  bestStreak,
}) => {
  return (
    <div className="unified-toolbar">
      <div className="stats-group">
        <div
          className={`stat-item ${streak > 0 ? 'streak-pop' : ''}`}
          key={`streak-${streak}`}
        >
          <FireIcon active={streak > 0} />
          <span className={`stat-value ${streak > 0 ? 'active-fire' : ''}`}>
            {streak}
          </span>
        </div>

        <div
          className={`stat-item ${bestStreak > 0 ? 'trophy-shine' : ''}`}
          key={`best-${bestStreak}`}
        >
          <TrophyIcon active={bestStreak > 0} />
          <span className={`stat-value ${bestStreak > 0 ? 'active-gold' : ''}`}>
            {bestStreak}
          </span>
        </div>
      </div>

      <div className="toolbar-divider"></div>

      <div className="categories-scroll-track">
        {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
          const isUnlocked = isCategoryUnlocked(key);
          const isActive = currentCategory === key;
          const stars = getCategoryStars(key);

          return (
            <button
              key={key}
              className={`cat-chip ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`}
              onClick={() => isUnlocked && onSelectCategory(key)}
              disabled={!isUnlocked}
            >
              <span className="cat-icon">
                {isUnlocked ? config.icon : '🔒'}
              </span>
              <span className="cat-label">{config.label}</span>
              {isUnlocked && stars > 0 && (
                <span className="cat-stars">★{stars}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
