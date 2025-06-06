import React, { useRef } from 'react';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import Workspace from '../components/Workspace/Workspace';
import Input from '../components/Input';

const Game: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // matchmaking state vars
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<
    string | null
  >('easy');
  const [difficultyIsOpen, setDifficultyIsOpen] = React.useState(false);
  // const [gameModeRef.current, setGameMode] = React.useState<'squads' | 'single' | null>(
  //   'single'
  // );
  const gameModeRef = useRef<'squads' | 'single' | null>('single');
  const [gameModeIsOpen, setGameModeIsOpen] = React.useState(false);
  const difficulties = ['easy', 'medium', 'hard'];
  const gameModes = ['single', 'squads'];

  // waiting menu state vars
  const [menu, setMenu] = React.useState<'single' | 'squads' | null>(null);

  const gameStateRef = useRef<
    'waiting' | 'matchmaking' | 'active' | 'over' | null
  >(null);
  const [, forceRender] = useState(0);

  // co-op matchmaking state vars
  const [roomId, setRoomId] = useState<string | null>(null);

  // game state vars
  const [gameId, setGameId] = useState<string | null>(null);
  const [problemId, setProblemId] = useState<string | null>(null);
  const [chatroomId, setChatroomId] = useState<string | null>(null);

  useEffect(() => {
    // Create a new WebSocket connection
    const host = import.meta.env.VITE_MATCHMAKING_API_HOST || 'localhost';
    const port = import.meta.env.VITE_MATCHMAKING_API_PORT || '8082';
    const ws = new WebSocket(`ws://${host}:${port}/matchmaking`);
    setSocket(ws);

    // Handle connection errors
    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    // Handle connection close
    ws.onclose = () => {
      // reconnect to the server
      console.log('WebSocket connection closed');
    };

    // handle matchmaking responses from the server
    ws.onmessage = (event) => {
      if (!gameStateRef.current) {
        console.log('Matchmaking not started yet');
        return;
      }

      const response = JSON.parse(event.data);
      console.log('Received:', response);

      if (gameModeRef.current === 'single') {
        // the next message will be state = waiting
        // then after that, game found
        if (gameStateRef.current === 'waiting') {
          // we are in a waiting state, theres not much to do
          gameStateRef.current = 'matchmaking';
          forceRender((prev) => prev + 1);
        } else if (gameStateRef.current === 'matchmaking') {
          // handle matchmaking response
          if (response.state === 'game found') {
            setGameId(response.gameid);
            setProblemId(response.problemid);
            setChatroomId(response.chatroom);
            localStorage.setItem('chatroomId', response.chatroom);
            gameStateRef.current = 'active';
            forceRender((prev) => prev + 1);
          }
        } else if (gameStateRef.current === 'active') {
          // handle active game response
          if (response.state === 'game finished') {
            // display the game over display
            gameStateRef.current = 'over';
            forceRender((prev) => prev + 1);
            setGameActive(false);
            setGameId(null);
            setProblemId(null);
            setChatroomId(null);
            setRoomId(null);
          }
        }
      } else if (gameModeRef.current === 'squads') {
        if (gameStateRef.current === 'waiting') {
          // if we are in matchmaking state or waiting state.
          if (response.state === 'waiting') {
            // if this is the room owner, then set the room id
            if (response.roomid) {
              setRoomId(response.roomid);
              console.log('Room ID:', response.roomid);
            }

            // otherwise set the state to waiting
            gameStateRef.current = 'waiting';
            forceRender((prev) => prev + 1);
          } else if (response.state === 'ready') {
            // the room is ready to matchmake
            gameStateRef.current = 'matchmaking';
            forceRender((prev) => prev + 1);
          }
        } else if (gameStateRef.current === 'matchmaking') {
          // handle matchmaking response
          if (response.state === 'game found') {
            setGameId(response.gameid);
            setProblemId(response.problemid);
            setChatroomId(response.chatroom);
            localStorage.setItem('chatroomId', response.chatroom);
            gameStateRef.current = 'active';
            forceRender((prev) => prev + 1);
          }
        } else if (gameStateRef.current === 'active') {
          // handle active game response
          if (response.state === 'game finished') {
            gameStateRef.current = 'over';
            forceRender((prev) => prev + 1);
            setGameActive(false);
            setGameId(null);
            setProblemId(null);
            setChatroomId(null);
            setRoomId(null);
          }
        }
      }
    };

    // Cleanup on component unmount
    return () => {
      if (ws.readyState === 1) {
        ws.close();
      }
    };
  }, []);

  const [showGameFound, setShowGameFound] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  useEffect(() => {
    if (gameStateRef.current === 'active') {
      setShowGameFound(true);
      const timer = setTimeout(() => {
        setShowGameFound(false);
        setGameActive(true);
      }, 3500); // 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer on unmount or state change
    }
  }, [gameStateRef.current]);

  const startQueue = () => {
    // send a message to the server to start the game
    if (!socket) {
      console.error('WebSocket is not connected');
      return;
    }

    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    gameStateRef.current = 'waiting';
    forceRender((prev) => prev + 1);

    const message = {
      state: gameModeRef.current === 'single' ? 'join comp' : 'make coop',
      userid: userId,
      mode: selectedDifficulty,
    };

    socket.send(JSON.stringify(message));

    console.log('Sent:', message);
    setMenu(gameModeRef.current);
  };

  const joinGame = () => {
    // send a message to the server to join the game
    if (!socket) {
      console.error('WebSocket is not connected');
      return;
    }

    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    gameStateRef.current = 'waiting';
    forceRender((prev) => prev + 1);
    const message = {
      state: 'join coop',
      userid: userId,
      roomid: roomId,
    };

    socket.send(JSON.stringify(message));
    console.log('Sent:', message);
    setMenu(gameModeRef.current);
  };

  const enterCoopMatchmaking = () => {
    // send a "ready" message to the socket
    if (!socket) {
      console.error('WebSocket is not connected');
      return;
    }

    const message = {
      state: 'ready up',
    };

    gameStateRef.current = 'matchmaking';
    forceRender((prev) => prev + 1);
    socket.send(JSON.stringify(message));
  };

  const SelectionMenu = () => {
    return (
      <>
        <h1 className="mb-5 text-xl font-bold">Look for a game to play</h1>
        <div>
          <Button
            className="w-40"
            variant="primary"
            onClick={() => setDifficultyIsOpen(!difficultyIsOpen)}
          >
            Select Difficulty
          </Button>
          {difficultyIsOpen && (
            <ul className="text-secondary border-border-primary bg-bg-muted absolute w-[50%] rounded-lg border">
              {difficulties.map((difficulty, index) => (
                <li
                  key={index}
                  className="text-secondary hover:bg-bg-active cursor-pointer p-2"
                  onClick={() => {
                    setSelectedDifficulty(difficulty);
                    setDifficultyIsOpen(false);
                  }}
                >
                  {difficulty}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <Button
            className="w-40"
            variant="primary"
            onClick={() => setGameModeIsOpen(!gameModeIsOpen)}
          >
            Select Gamemode
          </Button>
          {gameModeIsOpen && (
            <ul className="text-secondary border-border-primary bg-bg-muted absolute w-[50%] rounded-lg border">
              {gameModes.map((gm, index) => (
                <li
                  key={index}
                  className="text-secondary hover:bg-bg-active cursor-pointer p-2"
                  onClick={() => {
                    gameModeRef.current = gm as 'single' | 'squads';
                    setGameModeIsOpen(false);
                  }}
                >
                  {gm}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-5 flex flex-col items-center">
          <h1 className="text-xl font-bold">
            Selected Difficulty: {selectedDifficulty}
          </h1>
          <h1 className="text-xl font-bold">
            Selected Game Mode: {gameModeRef.current}
          </h1>
        </div>

        <Button
          className="w-40"
          variant="secondary"
          onClick={() => startQueue()}
        >
          Start Queue
        </Button>

        <h1 className="text-xl font-bold">Or, join a lobby</h1>
        <Input
          className="w-40"
          type="text"
          placeholder="Enter Room ID"
          value={roomId || ''}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <Button className="w-40" variant="secondary" onClick={() => joinGame()}>
          Join Game
        </Button>
      </>
    );
  };

  const MatchmakingMenu = () => {
    // display the matchmaking menu
    return (
      <>
        {gameStateRef.current === 'matchmaking' ||
        gameStateRef.current === 'waiting' ? (
          <>
            <h1 className="mb-5 text-xl font-bold">Looking for competitors</h1>
            <h1 className="text-xl font-bold">
              Selected Difficulty: {selectedDifficulty}
            </h1>
            <h1 className="text-xl font-bold">
              Selected Game Mode: {gameModeRef.current}
            </h1>
            <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
          </>
        ) : (
          showGameFound && (
            <>
              <h1 className="mb-5 text-xl font-bold">Game Found!</h1>
              <h1 className="text-xl font-bold">
                Game ID: {gameId}
                <br />
                Problem ID: {problemId}
                <br />
                Chatroom ID: {chatroomId}
              </h1>
            </>
          )
        )}
      </>
    );
  };

  const SquadMenu = () => {
    // will have the room id at the top
    // and will have a button for "ready" up

    return (
      <>
        {roomId ? (
          <>
            <h1 className="mb-5 text-xl font-bold">
              Room: {roomId}, share with your friends
            </h1>
            <Button
              className="w-40"
              variant="secondary"
              onClick={() => enterCoopMatchmaking()}
            >
              Enter Queue
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <h1 className="mb-5 text-xl font-bold">Creating Room...</h1>
            <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </>
    );
  };

  const GameOverDisplay = () => {
    return (
      <div className="bg-bg-active flex h-fit w-100 flex-col items-center gap-4 rounded-lg px-5 py-10">
        <h1 className="mb-5 text-xl font-bold">Game Over</h1>
        <h1 className="text-xl font-bold">
          Your Results:
          {/* TODO DISPLAY THE GAME RESULTS HERE */}
        </h1>
        <Button
          className="w-40"
          variant="secondary"
          onClick={() => window.location.reload()}
        >
          Play Again
        </Button>
      </div>
    );
  };

  return (
    <div
      className={`flex h-screen w-full flex-col ${gameActive ? '' : 'items-center'} overflow-x-hidden`}
    >
      <Navbar />

      <div
        className={`flex h-full w-full flex-col ${
          gameActive ? '' : 'items-center'
        } ${gameStateRef.current === 'over' ? 'blur-md' : ''}`} // Apply blur when gameStateRef.current === 'over'
      >
        {!gameActive ? (
          <div className="bg-bg-secondary relative mt-30 flex h-fit w-120 flex-col items-center justify-center gap-4 rounded-lg px-10 py-20">
            {menu === null ? (
              <SelectionMenu />
            ) : menu === 'single' ? (
              <MatchmakingMenu />
            ) : // if the menu is squads

            gameStateRef.current === 'matchmaking' ? (
              <MatchmakingMenu />
            ) : (
              <SquadMenu />
            )}
          </div>
        ) : (
          // the game is in active state
          problemId &&
          gameId && (
            <Workspace
              problemId={problemId}
              gameId={gameId}
              chatroomId={chatroomId!}
            />
          )
        )}
        {/* <Workspace problemId="b1b548b5-48b4-4be5-b3b4-551c7250100f" gameId="" /> */}
      </div>
      {/* Game Over Display */}
      {gameStateRef.current === 'over' && (
        <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center">
          <GameOverDisplay />
        </div>
      )}
    </div>
  );
};

export default Game;
