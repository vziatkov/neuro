export enum ProblemType {
  ADDITION = 'ADDITION',
  SUBTRACTION = 'SUBTRACTION'
}

export interface Problem {
  id: string;
  type: ProblemType;
  question: string; // Display text e.g., "5 + 3"
  answer: number | string; // The correct numerical answer
  visualData?: {
    a: number;
    b: number;
    operator: string;
  };
  difficultyRating: number; // The Elo rating of this specific problem
}

export interface UserProfile {
  name: string;
  elo: number; // Overall skill rating (starts at 1000)
  streak: number;
  stars: number;
  skillMap: {
    [key in ProblemType]: number; // Skill level per type
  };
}

export interface AttemptResult {
  isCorrect: boolean;
  timeTaken: number; // in seconds
  problemDifficulty: number;
}

export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  LEVEL_COMPLETE = 'LEVEL_COMPLETE'
}

// Improved feedback type
export type FeedbackType = 'success' | 'error' | null;

export interface Feedback {
  type: FeedbackType;
  message: string;
}
