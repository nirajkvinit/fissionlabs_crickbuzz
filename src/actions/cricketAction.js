import {
  ADD_COMMENTARY,
  START_GAME,
  TOSS_COIN,
  PAUSE_GAME,
  STOP_GAME,
  GAME_STARTED,
  SET_TEAMS,
  RESTART_GAME,
  CHANGE_INNING,
  SECOND_INNING_SCORE_UPDATE,
  GAME_FINISHED,
  RESET_GAME,
} from './types';
import { coinToss, chooseGameAction, getBowlingResult } from './helpers';
import {
  TEAMS,
  GAME_ACTIONS,
  BATTING,
  OVERS_PER_INNINGS,
  PLAYERS_PER_TEAM,
} from '../constants';
import moment from 'moment';
import store from '../store';

// start the cricket game
export const gameStart = () => (dispatch) => {
  const state = store.getState();
  const {
    cricket: { gameTimer },
  } = state;

  if (gameTimer !== null) {
    // game must have been paused, restart game
    dispatch({
      type: RESTART_GAME,
      payload: true,
    });

    // add commentary
    const comment = `Game restarted`;
    commentary(dispatch, comment);

    return;
  }

  // reset the game
  dispatch({
    type: RESET_GAME,
  });

  // start the game
  gameStarter(dispatch);
};

const gameStarter = (dispatch) => {
  let comment = '';

  // do the coin-toss
  const tossWinningTeam = coinToss(TEAMS);

  // set batting and bowling team
  const winnerGameAction = chooseGameAction(GAME_ACTIONS);
  let battingTeam = null,
    bowlingTeam = null;
  if (winnerGameAction === BATTING) {
    battingTeam = tossWinningTeam;
    bowlingTeam = TEAMS.filter((item) => item !== tossWinningTeam)[0];
  } else {
    battingTeam = TEAMS.filter((item) => item !== tossWinningTeam)[0];
    bowlingTeam = tossWinningTeam;
  }

  // set batting team
  dispatch({
    type: SET_TEAMS,
    payload: {
      batting: battingTeam,
      bowling: bowlingTeam,
    },
  });

  // add commentary
  comment = `${tossWinningTeam} won the toss and chose to do ${winnerGameAction}`;
  commentary(dispatch, comment);
  dispatch({
    type: TOSS_COIN,
    payload: comment,
  });

  dispatch({
    type: START_GAME,
    payload: true,
  });

  // start and save the game timer
  // do the next tick
  let gameTimerLocal = setInterval(() => {
    let {
      cricket: { gamePaused },
    } = store.getState();
    if (!gamePaused) {
      nextGameAction(dispatch);
    }
  }, 1000);

  dispatch({
    type: GAME_STARTED,
    payload: gameTimerLocal,
  });

  // add commentary
  comment = `Game started`;
  commentary(dispatch, comment);
};

// pause the game
export const gamePause = () => (dispatch) => {
  dispatch({
    type: PAUSE_GAME,
    payload: true,
  });

  let comment = `Game was paused`;
  commentary(dispatch, comment);
};

// reset the state and stop the game
export const gameStop = () => (dispatch) => {
  let {
    cricket: { gameTimer },
  } = store.getState();

  clearInterval(gameTimer);

  dispatch({
    type: STOP_GAME,
  });
  // add commentary
  const comment = `Game stopped`;
  commentary(dispatch, comment);
};

// add running commentary
const commentary = (dispatch, comment = '') => {
  dispatch({
    type: ADD_COMMENTARY,
    payload: `${moment().format('MMMM Do YYYY, h:mm:ss a')} - ${comment}`,
  });
};

const nextGameAction = (dispatch) => {
  const {
    cricket: { inningCount, firstInning, secondInning },
  } = store.getState();

  const bowlingResult = getBowlingResult();

  if (inningCount === 1) {
    let {
      bowling,
      ballsThrown,
      oversThrown,
      wicketsTaken,
      totalRuns,
    } = firstInning;

    switch (bowlingResult) {
      case 'wd':
      case 'nb':
        totalRuns++;
        break;
      case 'out':
        ballsThrown++;
        wicketsTaken++;
        break;
      default:
        ballsThrown++;
        totalRuns += bowlingResult;
        break;
    }

    if (ballsThrown === 6) {
      oversThrown++;
      ballsThrown = 0;
    }

    if (
      oversThrown === OVERS_PER_INNINGS ||
      wicketsTaken === PLAYERS_PER_TEAM - 1
    ) {
      // dispatch inning change
      dispatch({
        type: CHANGE_INNING,
        payload: inningCount + 1,
      });
    }

    dispatch({
      type: 'FIRST_INNING_SCORE_UPDATE',
      payload: {
        ballsThrown,
        oversThrown,
        wicketsTaken,
        totalRuns,
        lastBall: String(bowlingResult),
      },
    });

    let comment = `Bowler of team ${bowling} bowled ${bowlingResult}`;
    commentary(dispatch, comment);
  } else if (inningCount === 2) {
    let {
      batting,
      bowling,
      ballsThrown,
      oversThrown,
      wicketsTaken,
      totalRuns,
    } = secondInning;

    let { totalRuns: firstInningTotalRun } = firstInning;

    switch (bowlingResult) {
      case 'wd':
      case 'nb':
        totalRuns++;
        break;
      case 'out':
        ballsThrown++;
        wicketsTaken++;
        break;
      default:
        ballsThrown++;
        totalRuns += bowlingResult;
        break;
    }

    if (ballsThrown === 6) {
      oversThrown++;
      ballsThrown = 0;
    }

    let comment = `Bowler of team ${bowling} bowled ${bowlingResult}`;
    commentary(dispatch, comment);

    if (
      oversThrown === OVERS_PER_INNINGS ||
      wicketsTaken === PLAYERS_PER_TEAM - 1 ||
      totalRuns > firstInningTotalRun
    ) {
      // process second inning
      let comment = `Game finished! Processing scores`;
      commentary(dispatch, comment);
      dispatch(gameStop());

      if (totalRuns > firstInningTotalRun) {
        comment = `${batting} won the game by ${
          PLAYERS_PER_TEAM - wicketsTaken
        } wickets. ${bowling} lost the game.`;
      } else {
        comment = `${bowling} won the game by ${
          firstInningTotalRun - totalRuns
        } runs. ${batting} lost the game.`;
      }

      dispatch({
        type: GAME_FINISHED,
        payload: comment,
      });

      commentary(dispatch, comment);
    }

    dispatch({
      type: SECOND_INNING_SCORE_UPDATE,
      payload: {
        ballsThrown,
        oversThrown,
        wicketsTaken,
        totalRuns,
        lastBall: String(bowlingResult),
      },
    });
  }
};
