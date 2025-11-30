import React from 'react';
import { GameHeader } from './GameHeader';
import { VisualAid } from './VisualAid';
import { ProblemDisplay } from './ProblemDisplay';
import { NumberPad } from './NumberPad';
import { FeedbackOverlay } from './FeedbackOverlay';
import { Problem, UserProfile, Feedback } from '../types';

type InputValue = number | 'DEL' | 'ENTER';

interface GameScreenProps {
  profile: UserProfile;
  currentProblem: Problem | null;
  userAnswer: string;
  feedback: Feedback;
  onInput: (value: InputValue) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  profile,
  currentProblem,
  userAnswer,
  feedback,
  onInput,
}) => {
  const isInputDisabled = feedback.type !== null;

  return (
    <div className="min-h-screen bg-neuro-bg text-white font-sans overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 neuro-grid opacity-30 pointer-events-none" aria-hidden="true" />
      
      <GameHeader profile={profile} />

      <main className="flex-1 flex flex-col items-center justify-center p-2 z-0 relative">
        <FeedbackOverlay type={feedback.type} message={feedback.message} />

        {currentProblem && <VisualAid problem={currentProblem} />}

        <ProblemDisplay problem={currentProblem} userAnswer={userAnswer} />

        <NumberPad onInput={onInput} disabled={isInputDisabled} />
      </main>
    </div>
  );
};

