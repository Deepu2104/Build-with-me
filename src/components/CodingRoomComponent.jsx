// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CodingRoom.scss';

const CodingRoomComponent = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStartClicked, setIsStartClicked] = useState(false);
  const [isStopClicked, setIsStopClicked] = useState(false);
  const [isResetClicked, setIsResetClicked] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartTimer = () => {
    setIsRunning(true);
    setIsStartClicked(true);
    setIsStopClicked(false);
    setIsResetClicked(false);
  };

  const handleStopTimer = () => {
    setIsRunning(false);
    setIsStopClicked(true);
    setIsStartClicked(false);
    setIsResetClicked(false);
  };

  const handleResetTimer = () => {
    setTimer(0);
    setIsResetClicked(true);
    setIsStartClicked(false);
    setIsStopClicked(false);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const [randomProblemLink, setRandomProblemLink] = useState('');

  const generateRandomProblemLink = async () => {
    const maxContestId = 2000; // Maximum contest ID on Codeforces
    let randomContestId;
    let problemLink;

    const checkProblemExists = async (id) => {
      const response = await fetch(`https://codeforces.com/api/problemset.problems`);
      const data = await response.json();
      const problems = data.result.problems;
      return problems.some((problem) => problem.contestId === id);
    };

    const getRandomContestId = async () => {
      let isProblemValid = false;

      while (!isProblemValid) {
        randomContestId = Math.floor(Math.random() * maxContestId) + 1;
        isProblemValid = await checkProblemExists(randomContestId);
      }
    };

    const generateProblemLink = () => {
      problemLink = `https://codeforces.com/contest/${randomContestId}/problem/C`;
    };

    await getRandomContestId();
    generateProblemLink();

    setRandomProblemLink(problemLink);
  };

  const navigate = useNavigate();

  const goBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="coding-room-container">
      <h2>
        Welcome to the Coding Room.
      </h2>
      <div className="timer">Timer: {formatTime(timer)}</div>
      <div className="button-container">
        <button className={`start-button ${isStartClicked ? 'active' : ''}`} onClick={handleStartTimer}>
          Start
        </button>
        <button className={`stop-button ${isStopClicked ? 'active' : ''}`} onClick={handleStopTimer}>
          Stop
        </button>
        <button className={`reset-button ${isResetClicked ? 'active' : ''}`} onClick={handleResetTimer}>
          Reset
        </button>
      </div>

      <div className="problem-container">
        <button className="random-problem-button" onClick={generateRandomProblemLink}>
          Generate Random Codeforces Problem
        </button>
        {randomProblemLink && (
          <div className="random-problem-link">
            <a href={randomProblemLink} target="_blank" rel="noopener noreferrer">
              {randomProblemLink}
            </a>
          </div>
        )}
      </div>
      <button className="go-back-button" onClick={goBackToHome}>
        Go Back
      </button>
    </div>
  );
};

export default CodingRoomComponent;
