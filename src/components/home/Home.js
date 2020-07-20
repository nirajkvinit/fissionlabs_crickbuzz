import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PLAYERS_PER_TEAM } from '../../constants';
import { gameStart, gamePause, gameStop } from '../../actions/cricketAction';

class Home extends Component {
  getPlayersList(batting) {
    let strReturn = [];
    for (let i = 0; i < PLAYERS_PER_TEAM; i++) {
      let item = (
        <tr key={`${batting}_Player${i + 1}`}>
          <td>{`${batting}_Player${i + 1}`}</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0.0</td>
        </tr>
      );
      strReturn.push(item);
    }

    return strReturn;
  }

  // getInning1Stats() {
  //   const {
  //     cricket: {
  //       inningCount,
  //       firstInning: { batting, bowling, totalRuns, bowlingLog },
  //     },
  //   } = this.props;

  //   if (!inningCount || inningCount < 1) return null;

  //   let fours = 0,
  //     sixes = 0,
  //     noballs = 0,
  //     wides = 0;

  //   bowlingLog.forEach((item) => {
  //     switch (item) {
  //       case '4':
  //         fours++;
  //         break;
  //       case '6':
  //         sixes++;
  //         break;
  //       case 'nb':
  //         noballs++;
  //         break;
  //       case 'wd':
  //         wides++;
  //         break;
  //       default:
  //         break;
  //     }
  //   });

  //   return (
  //     <div>
  //       <div>
  //         Batting: {batting}, Bowling: {bowling}
  //       </div>
  //       <table className="table">
  //         <thead>
  //           <tr>
  //             <th>Batsmen</th>
  //             <th>R</th>
  //             <th>B</th>
  //             <th>4s</th>
  //             <th>6s</th>
  //             <th>SR</th>
  //           </tr>
  //         </thead>
  //         <tbody>{this.getPlayersList(batting)}</tbody>
  //         <tfoot>
  //           <tr>
  //             <th>Total</th>
  //             <th>{totalRuns ? totalRuns : 0}</th>
  //             <th>-</th>
  //             <th>{fours}</th>
  //             <th>{sixes}</th>
  //             <th>-</th>
  //           </tr>
  //           <tr>
  //             <th>Extras</th>
  //             <th colSpan="5">
  //               (NB {noballs}, W {wides})
  //             </th>
  //           </tr>
  //         </tfoot>
  //       </table>
  //     </div>
  //   );
  // }
  getInningStats(inningCount, inningData) {
    const {
      batting,
      bowling,
      totalRuns,
      bowlingLog,
      oversThrown,
      ballsThrown,
      wicketsTaken,
    } = inningData;

    if (!inningCount || inningCount < 1) return null;

    let zeros = 0,
      fours = 0,
      sixes = 0,
      noballs = 0,
      wides = 0;

    bowlingLog.forEach((item) => {
      switch (item) {
        case '0':
          zeros++;
          break;
        case '4':
          fours++;
          break;
        case '6':
          sixes++;
          break;
        case 'nb':
          noballs++;
          break;
        case 'wd':
          wides++;
          break;
        default:
          break;
      }
    });

    return (
      <div>
        <div>
          Batting: {batting}, Bowling: {bowling}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Batsmen</th>
              <th>R</th>
              <th>B</th>
              <th>4s</th>
              <th>6s</th>
              <th>SR</th>
            </tr>
          </thead>
          <tbody>{this.getPlayersList(batting)}</tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th>{totalRuns ? totalRuns : 0}</th>
              <th>-</th>
              <th>{fours}</th>
              <th>{sixes}</th>
              <th>-</th>
            </tr>
            <tr>
              <th>Extras</th>
              <th colSpan="5">
                (NB {noballs}, W {wides})
              </th>
            </tr>
          </tfoot>
        </table>

        <div>Fall of Wickets: Under Construction</div>
        <table className="table">
          <thead>
            <tr>
              <th>Bowling</th>
              <th>O</th>
              <th>M</th>
              <th>R</th>
              <th>W</th>
              <th>Econ</th>
              <th>0s</th>
              <th>4s</th>
              <th>6s</th>
              <th>WD</th>
              <th>NB</th>
            </tr>
          </thead>
          <tbody></tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th>
                {oversThrown}:{ballsThrown}
              </th>
              <th>0</th>
              <th>{totalRuns}</th>
              <th>{wicketsTaken}</th>
              <th>Econ</th>
              <th>{zeros}</th>
              <th>{fours}</th>
              <th>{sixes}</th>
              <th>{wides}</th>
              <th>{noballs}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

  render() {
    const {
      cricket: {
        gameStarted,
        gamePaused,
        gameFinished,
        commentary,
        inningCount,
        firstInning,
        secondInning,
        tossComment,
        winningComment,
      },
    } = this.props;

    const { totalRuns: firstInningTotalRuns = 0 } = firstInning;
    const { totalRuns: secondInningTotalRuns = 0 } = secondInning;

    return (
      <div>
        <div className="container">
          <div className="p-3">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="card ">
                  <div className="card-header">
                    CrickBuzz - React based Cricket Game App
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <div>
                          Please use the buttons given below to start/pause or
                          stop a cricket game.
                        </div>
                        <div className="pb-1">
                          <button
                            className="btn btn-primary primary-btn col-md-12"
                            disabled={gameStarted}
                            onClick={this.props.gameStart}
                          >
                            {gameStarted ? 'Game running' : 'Start the game'}
                          </button>
                        </div>

                        <div className="pb-1">
                          <button
                            className="btn btn-info info-btn col-md-12"
                            disabled={!gameStarted}
                            onClick={this.props.gamePause}
                          >
                            {gamePaused ? 'Game paused' : 'Pause the game'}
                          </button>
                        </div>

                        <button
                          className="btn btn-warning warning-btn col-md-12"
                          disabled={
                            gameStarted ? false : gamePaused ? false : true
                          }
                          onClick={this.props.gameStop}
                        >
                          Stop the game
                        </button>
                      </div>
                      <div className="col-md-8">
                        <strong>Game Summary:</strong>
                        <table className="table table-striped table-hover ">
                          <thead>
                            <tr>
                              <th>Inning</th>
                              <th>Batting</th>
                              <th>Bowling</th>
                              <th>Total Runs</th>
                              <th>Wikets</th>
                              <th>Total Overs</th>
                              <th>Last Ball</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className={inningCount === 1 ? 'boldtr' : ''}>
                              <td>1st</td>
                              <td>
                                {gameFinished ? (
                                  secondInningTotalRuns >
                                  firstInningTotalRuns ? (
                                    <span className="alert-danger">
                                      {firstInning.batting}
                                    </span>
                                  ) : (
                                    <span className="alert-success">
                                      {firstInning.batting}
                                    </span>
                                  )
                                ) : firstInning.batting ? (
                                  firstInning.batting
                                ) : (
                                  '-'
                                )}
                              </td>
                              <td>
                                {gameFinished ? (
                                  secondInningTotalRuns >
                                  firstInningTotalRuns ? (
                                    <span className="alert-success">
                                      {firstInning.bowling}
                                    </span>
                                  ) : (
                                    <span className="alert-danger">
                                      {firstInning.bowling}
                                    </span>
                                  )
                                ) : firstInning.bowling ? (
                                  firstInning.bowling
                                ) : (
                                  '-'
                                )}
                              </td>

                              <td>
                                {firstInning.totalRuns
                                  ? firstInning.totalRuns
                                  : '0'}
                              </td>
                              <td>
                                {firstInning.wicketsTaken
                                  ? firstInning.wicketsTaken
                                  : '0'}
                              </td>
                              <td>
                                {firstInning.oversThrown
                                  ? firstInning.oversThrown
                                  : '0'}
                                :
                                {firstInning.ballsThrown
                                  ? firstInning.ballsThrown
                                  : '0'}
                              </td>
                              <td>
                                {firstInning.lastBall
                                  ? firstInning.lastBall
                                  : '-'}
                              </td>
                            </tr>
                            <tr className={inningCount === 2 ? 'boldtr' : ''}>
                              <td>2nd</td>
                              <td>
                                {gameFinished ? (
                                  secondInningTotalRuns >
                                  firstInningTotalRuns ? (
                                    <span className="alert-success">
                                      {secondInning.batting}
                                    </span>
                                  ) : (
                                    <span className="alert-danger">
                                      {secondInning.batting}
                                    </span>
                                  )
                                ) : secondInning.batting ? (
                                  secondInning.batting
                                ) : (
                                  '-'
                                )}
                              </td>
                              <td>
                                {gameFinished ? (
                                  secondInningTotalRuns >
                                  firstInningTotalRuns ? (
                                    <span className="alert-danger">
                                      {secondInning.bowling}
                                    </span>
                                  ) : (
                                    <span className="alert-success">
                                      {secondInning.bowling}
                                    </span>
                                  )
                                ) : secondInning.bowling ? (
                                  secondInning.bowling
                                ) : (
                                  '-'
                                )}
                              </td>
                              <td>
                                {secondInning.totalRuns
                                  ? secondInning.totalRuns
                                  : '0'}
                              </td>
                              <td>
                                {secondInning.wicketsTaken
                                  ? secondInning.wicketsTaken
                                  : '0'}
                              </td>
                              <td>
                                {secondInning.oversThrown
                                  ? secondInning.oversThrown
                                  : '0'}
                                :
                                {secondInning.ballsThrown
                                  ? secondInning.ballsThrown
                                  : '0'}
                              </td>
                              <td>
                                {secondInning.lastBall
                                  ? secondInning.lastBall
                                  : '-'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-1">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="card">
                  <div className="card-header alert-info">Commentary</div>
                  <div className="card-body">
                    <div className="commentary">
                      {commentary.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <strong>{tossComment ? tossComment : ''}</strong>
              </div>
              <div className="col-md-6">
                <strong>
                  {gameFinished ? (winningComment ? winningComment : '') : ''}
                </strong>
              </div>

              <div className="col-md-6 col-sm-6">
                <div className="card">
                  <div className="card-header alert-info">
                    Score Card (1st Inning)
                  </div>
                  <div className="card-body">
                    {this.getInningStats(inningCount, firstInning)}
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-6">
                <div className="card">
                  <div className="card-header alert-info">
                    Score Card (2nd Inning)
                  </div>
                  <div className="card-body">
                    {this.getInningStats(inningCount, secondInning)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cricket: state.cricket,
});

export default connect(mapStateToProps, { gameStart, gamePause, gameStop })(
  Home
);
