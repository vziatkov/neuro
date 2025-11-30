/**
 * Game Configuration Constants
 * Centralized configuration for easy tuning and maintenance
 */

export const GAME_CONFIG = {
  FEEDBACK_DELAY_MS: 2000,
  MAX_ANSWER_DIGITS: 2,
  MAX_ANSWER_VALUE: 20,
  MIN_ANSWER_VALUE: 0,
} as const;

export const AI_CONFIG = {
  K_FACTOR: 40, // High volatility for faster adjustment
  INITIAL_ELO: 1000,
  MIN_ELO: 800,
  MAX_ELO: 2000,
  SPEED_THRESHOLDS: {
    FAST_SECONDS: 5,
    SLOW_SECONDS: 15,
  },
  SPEED_BONUS: {
    FAST: 5,
    SLOW: -5,
  },
  DIFFICULTY_THRESHOLD: 1050,
  EASY_MAX: 10,
  HARD_MAX: 20,
  INITIAL_SKILL: {
    ADDITION: 1000,
    SUBTRACTION: 900,
  },
} as const;

export const VISUAL_CONFIG = {
  COLORS: {
    PRIMARY: '#22d3ee', // cyan
    SECONDARY: '#d946ef', // purple
    SUCCESS: '#10b981', // green
    ERROR: '#ef4444', // red
    WARNING: '#f59e0b', // amber
  },
  ANIMATIONS: {
    FLOAT_DURATION: '6s',
    FEEDBACK_DURATION: 300,
  },
} as const;

