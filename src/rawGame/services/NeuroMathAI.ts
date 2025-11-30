import { Problem, ProblemType, AttemptResult, UserProfile } from '../types';
import { AI_CONFIG } from '../constants';

/**
 * NeuroMathAI
 * 
 * SIMPLIFIED VERSION:
 * - Only Addition and Subtraction.
 * - Max number cap is 20 (perfect for Ten-Frame visualization).
 * - Adaptation controls complexity (e.g. sums < 10 vs sums > 10).
 */
export class NeuroMathAI {
  private profile: UserProfile;
  
  constructor(initialProfile?: UserProfile) {
    this.profile = initialProfile || {
      name: "Cadet",
      elo: AI_CONFIG.INITIAL_ELO, 
      streak: 0,
      stars: 0,
      skillMap: {
        [ProblemType.ADDITION]: AI_CONFIG.INITIAL_SKILL.ADDITION,
        [ProblemType.SUBTRACTION]: AI_CONFIG.INITIAL_SKILL.SUBTRACTION,
      }
    };
  }

  public getProfile(): UserProfile {
    return { ...this.profile };
  }

  public processResult(result: AttemptResult, problemType: ProblemType): void {
    // 1. Analyze Accuracy
    const actualScore = result.isCorrect ? 1 : 0;
    
    // 2. Analyze Speed (Bonus/Penalty)
    let speedBonus = 0;
    if (result.isCorrect) {
      if (result.timeTaken < AI_CONFIG.SPEED_THRESHOLDS.FAST_SECONDS) {
        speedBonus = AI_CONFIG.SPEED_BONUS.FAST;
      } else if (result.timeTaken > AI_CONFIG.SPEED_THRESHOLDS.SLOW_SECONDS) {
        speedBonus = AI_CONFIG.SPEED_BONUS.SLOW;
      }
    }

    // 3. Update Skill using Elo rating system
    const currentSkill = this.profile.skillMap[problemType];
    const expectedScore = 1 / (1 + Math.pow(10, (result.problemDifficulty - currentSkill) / 400));
    const ratingChange = Math.round(
      AI_CONFIG.K_FACTOR * (actualScore - expectedScore) + speedBonus
    );
    
    this.profile.skillMap[problemType] += ratingChange;
    
    // Clamp ratings to valid range
    this.profile.skillMap[problemType] = Math.max(
      AI_CONFIG.MIN_ELO,
      Math.min(AI_CONFIG.MAX_ELO, this.profile.skillMap[problemType])
    );

    // Update Global Elo
    const skills = Object.values(this.profile.skillMap);
    this.profile.elo = Math.round(skills.reduce((a, b) => a + b, 0) / skills.length);

    // Update Streak/Stars
    if (result.isCorrect) {
      this.profile.streak++;
      this.profile.stars += 1;
      if (this.profile.streak % 5 === 0) this.profile.stars += 5;
    } else {
      this.profile.streak = 0;
    }
  }

  public generateProblem(): Problem {
    // 50/50 chance of Add vs Sub, or weighted by lowest skill to shore up weaknesses
    const types = [ProblemType.ADDITION, ProblemType.SUBTRACTION];
    const type = types[Math.floor(Math.random() * types.length)];
    const skill = this.profile.skillMap[type];

    // DIFFICULTY LOGIC FOR "UP TO 20"
    // Skill < threshold: Stay within 0-10 (easy)
    // Skill > threshold: Go up to 20 (hard)
    let maxNum: number = AI_CONFIG.EASY_MAX as number;
    if (skill > AI_CONFIG.DIFFICULTY_THRESHOLD) {
      maxNum = AI_CONFIG.HARD_MAX as number;
    }

    if (type === ProblemType.ADDITION) {
      return this.generateAddition(skill, maxNum);
    } else {
      return this.generateSubtraction(skill, maxNum);
    }
  }

  private generateAddition(skill: number, maxNum: number): Problem {
    // If skill is low, ensure sum <= 10
    // If skill is high, ensure sum <= 20
    
    let a, b;
    
    if (maxNum === 10) {
      // Simple addition within 10
      a = Math.floor(Math.random() * 6); // 0-5
      b = Math.floor(Math.random() * (11 - a)); // ensures a+b <= 10
    } else {
      // Harder addition within 20
      // We want to encourage "bridging 10" e.g., 8 + 5
      a = Math.floor(Math.random() * 11) + 5; // 5-15
      const remaining = 20 - a;
      b = Math.floor(Math.random() * (remaining + 1));
    }
    
    return {
      id: Date.now().toString(),
      type: ProblemType.ADDITION,
      question: `${a} + ${b} = ?`,
      answer: a + b,
      visualData: { a, b, operator: '+' },
      difficultyRating: skill
    };
  }

  private generateSubtraction(skill: number, maxNum: number): Problem {
    let a, b;

    if (maxNum === 10) {
      a = Math.floor(Math.random() * 11); // 0-10
      b = Math.floor(Math.random() * (a + 1)); // b <= a
    } else {
      // Within 20
      a = Math.floor(Math.random() * 11) + 10; // 10-20 (Start with bigger number)
      b = Math.floor(Math.random() * (a + 1)); 
    }
    
    return {
      id: Date.now().toString(),
      type: ProblemType.SUBTRACTION,
      question: `${a} - ${b} = ?`,
      answer: a - b,
      visualData: { a, b, operator: '-' },
      difficultyRating: skill
    };
  }
}