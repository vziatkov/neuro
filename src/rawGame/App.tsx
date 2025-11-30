import React from 'react';
import { GameState } from './types';
import { MenuScreen } from './components/MenuScreen';
import { GameScreen } from './components/GameScreen';
import { useGameLogic } from './hooks/useGameLogic';

const App: React.FC = () => {
  const {
    gameState,
    currentProblem,
    userAnswer,
    feedback,
    profile,
    startGame,
    handleInput,
  } = useGameLogic();

  if (gameState === GameState.MENU) {
    return <MenuScreen onStart={startGame} />;
  }

  return (
    <GameScreen
      profile={profile}
      currentProblem={currentProblem}
      userAnswer={userAnswer}
      feedback={feedback}
      onInput={handleInput}
    />
  );
};

export default App;
