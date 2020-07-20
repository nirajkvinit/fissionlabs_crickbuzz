import {
  ADD_COMMENTARY,
  SET_TEAMS,
  PAUSE_GAME,
  START_GAME,
  GAME_STARTED,
  STOP_GAME,
  RESTART_GAME,
  CHANGE_INNING,
  FIRST_INNING_SCORE_UPDATE,
  SECOND_INNING_SCORE_UPDATE,
  GAME_FINISHED,
  TOSS_COIN,
  RESET_GAME,
} from '../actions/types';

const initialState = {
  gameTimer: null,
  gameStarted: false,
  gamePaused: false,
  gameFinished: false,
  inningCount: null,
  tossComment: null,
  winningComment: null,
  firstInning: {
    batting: null,
    bowling: null,
    ballsThrown: 0,
    oversThrown: 0,
    wicketsTaken: 0,
    totalRuns: 0,
    lastBall: null,
    bowlingLog: [],
  },
  secondInning: {
    batting: null,
    bowling: null,
    ballsThrown: 0,
    oversThrown: 0,
    wicketsTaken: 0,
    totalRuns: 0,
    lastBall: null,
    bowlingLog: [],
  },
  commentary: ['- Waiting for the game to start'],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESET_GAME: {
      return {
        ...initialState,
      };
    }
    case ADD_COMMENTARY:
      return {
        ...state,
        commentary: [action.payload, ...state.commentary],
      };
    case SET_TEAMS:
      return {
        ...state,
        firstInning: {
          ...state.firstInning,
          batting: action.payload.batting,
          bowling: action.payload.bowling,
        },
        secondInning: {
          ...state.secondInning,
          bowling: action.payload.batting,
          batting: action.payload.bowling,
        },
      };
    case TOSS_COIN:
      return {
        ...state,
        tossComment: action.payload,
      };
    case START_GAME:
      return {
        ...state,
        gamePaused: !action.payload,
        gameStarted: action.payload,
        inningCount: 1,
      };
    case RESTART_GAME:
      return {
        ...state,
        gamePaused: !action.payload,
        gameStarted: action.payload,
      };
    case PAUSE_GAME:
      return {
        ...state,
        gamePaused: action.payload,
        gameStarted: !action.payload,
      };
    case GAME_STARTED:
      return {
        ...state,
        gameTimer: action.payload,
        gameFinished: false,
      };
    case GAME_FINISHED:
      return {
        ...state,
        gameTimer: null,
        gameFinished: true,
        winningComment: action.payload,
      };
    case STOP_GAME:
      return {
        ...state,
        gameTimer: null,
        gameStarted: false,
        gamePaused: false,
      };
    case CHANGE_INNING:
      return {
        ...state,
        inningCount: action.payload,
      };
    case FIRST_INNING_SCORE_UPDATE:
      return {
        ...state,
        firstInning: {
          ...state.firstInning,
          ballsThrown: action.payload.ballsThrown,
          oversThrown: action.payload.oversThrown,
          wicketsTaken: action.payload.wicketsTaken,
          totalRuns: action.payload.totalRuns,
          lastBall: action.payload.lastBall,
          bowlingLog: [
            ...state.firstInning.bowlingLog,
            action.payload.lastBall,
          ],
        },
      };
    case SECOND_INNING_SCORE_UPDATE:
      return {
        ...state,
        secondInning: {
          ...state.secondInning,
          ballsThrown: action.payload.ballsThrown,
          oversThrown: action.payload.oversThrown,
          wicketsTaken: action.payload.wicketsTaken,
          totalRuns: action.payload.totalRuns,
          lastBall: action.payload.lastBall,
          bowlingLog: [
            ...state.secondInning.bowlingLog,
            action.payload.lastBall,
          ],
        },
      };
    default:
      return state;
  }
}
