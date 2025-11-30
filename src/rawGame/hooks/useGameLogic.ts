import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { NeuroMathAI } from '../services/NeuroMathAI';
import { GameState, Problem, Feedback, UserProfile } from '../types';
import { GAME_CONFIG } from '../constants';

type InputValue = number | 'DEL' | 'ENTER';

export const useGameLogic = () => {
  // Use useRef to avoid recreating AI instance on every render
  const ai = useRef(new NeuroMathAI()).current;
  
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<Feedback>({ type: null, message: '' });
  const [profile, setProfile] = useState<UserProfile>(ai.getProfile());
  const [startTime, setStartTime] = useState<number>(0);

  const nextProblem = useCallback(() => {
    const problem = ai.generateProblem();
    setCurrentProblem(problem);
    setUserAnswer('');
    setFeedback({ type: null, message: '' });
    setStartTime(Date.now());
  }, [ai]);

  const startGame = useCallback(() => {
    setGameState(GameState.PLAYING);
    nextProblem();
  }, [nextProblem]);

  const handleInput = useCallback((val: InputValue) => {
    if (feedback.type) return; // Block input during feedback

    if (val === 'DEL') {
      setUserAnswer(prev => prev.slice(0, -1));
    } else if (val === 'ENTER') {
      submitAnswer(userAnswer);
    } else if (typeof val === 'number') {
      // Limit to max digits
      setUserAnswer(prev => (prev + val).slice(0, GAME_CONFIG.MAX_ANSWER_DIGITS));
    }
  }, [feedback.type, userAnswer]);

  const submitAnswer = useCallback((answer: string) => {
    if (!currentProblem) {
      console.error('No current problem available');
      return;
    }

    if (!answer || answer.trim() === '') {
      setFeedback({ 
        type: 'error', 
        message: 'Please enter an answer' 
      });
      return;
    }

    const timeTaken = (Date.now() - startTime) / 1000;
    const answerNum = parseInt(answer, 10);
    const correctAnswer = parseInt(currentProblem.answer.toString(), 10);
    const isCorrect = answerNum === correctAnswer;

    // Visual Feedback
    if (isCorrect) {
      setFeedback({ type: 'success', message: 'Correct!' });
    } else {
      setFeedback({ 
        type: 'error', 
        message: `Oops! It was ${correctAnswer}` 
      });
    }

    // AI Processing
    ai.processResult({
      isCorrect,
      timeTaken,
      problemDifficulty: currentProblem.difficultyRating
    }, currentProblem.type);

    setProfile(ai.getProfile());
  }, [currentProblem, startTime, ai]);

  // Handle feedback delay and next problem
  useEffect(() => {
    if (!feedback.type) return;

    const timer = setTimeout(() => {
      nextProblem();
    }, GAME_CONFIG.FEEDBACK_DELAY_MS);

    return () => clearTimeout(timer);
  }, [feedback.type, nextProblem]);

  return {
    gameState,
    currentProblem,
    userAnswer,
    feedback,
    profile,
    startGame,
    handleInput,
  };
};

