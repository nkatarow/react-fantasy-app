import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PlayerDetail extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        playerid: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

  // TODO: Is there a way to get to playerSeason without having to set it as a separate state?
  state = {
    player: {},
    playerSeason: {},
  }

  async componentDidMount() {
    const TEST_DATA = true;
    let result;

    try {
      if (TEST_DATA) {
        result = await fetch(`/data/players/${this.props.match.params.playerid}.json`);
      } else {
        result = await fetch('https://api.fantasydata.net/v3/nfl/stats/JSON/Player/2593', {
          headers: { 'Ocp-Apim-Subscription-Key': 'bd237b0dc9074a3f9318d38be3c0d501' },
        });
      }
      const player = await result.json();
      this.setState({
        player,
        playerSeason: player.PlayerSeason,
      });
    } catch (e) {
      if (TEST_DATA) {
        // Backup for dev puposes
        result = await fetch('/data/players/2593.json');
        const player = await result.json();
        this.setState({
          player,
          playerSeason: player.PlayerSeason,
        });
      } else {
        console.log(e); // eslint-disable-line
      }
    }
  }


  render() {
    const { player, playerSeason } = this.state;

    /*
      TODO: Instead of displaying by position, an audit should be done of all
            stats in that category to see if there is anything besides zero.
    */
    const isQB = player.FantasyPosition === 'QB';

    return (
      <div>
        <img src={player.PhotoUrl} alt="" />
        <h1>{player.FirstName} {player.LastName}</h1>

        <h2>Player Info</h2>
        <dl>
          <dt>Position: </dt>
          <dd>{player.FantasyPosition}</dd>

          <dt>Team: </dt>
          <dd>{player.CurrentTeam}</dd>

          <dt>Number: </dt>
          <dd>{player.Number}</dd>

          <dt>Injury Status: </dt>
          <dd>{player.InjuryStatus}</dd>

          <dt>Height</dt>
          <dd>{player.Height}</dd>

          <dt>Weight</dt>
          <dd>{player.Weight}</dd>

          <dt>College</dt>
          <dd>{player.College}</dd>

          <dt>Age</dt>
          <dd>{player.Age}</dd>

          <dt>Draft</dt>
          <dd>{player.CollegeDraftYear} {player.CollegeDraftRound} Round ({player.CollegeDraftPick} Overall) by {player.CollegeDraftTeam}</dd>
        </dl>

        <h2>Season Stats</h2>
        {isQB &&
          <dl>
            <h2>Passing</h2>

            <dt>Passing Attempts</dt>
            <dd>{playerSeason.PassingAttempts}</dd>

            <dt>Passing Completions</dt>
            <dd>{playerSeason.PassingCompletions}</dd>

            <dt>Passing Yards</dt>
            <dd>{playerSeason.PassingYards}</dd>

            <dt>Completion Percentage</dt>
            <dd>{playerSeason.PassingCompletionPercentage}</dd>

            <dt>Yards per Attempt</dt>
            <dd>{playerSeason.PassingYardsPerAttempt}</dd>

            <dt>Yards per Completion</dt>
            <dd>{playerSeason.PassingYardsPerCompletion}</dd>

            <dt>Passer Rating</dt>
            <dd>{playerSeason.PassingRating}</dd>

            <dt>Passing Touchdowns</dt>
            <dd>{playerSeason.PassingTouchdowns}</dd>

            <dt>Passing Interceptions</dt>
            <dd>{playerSeason.PassingInterceptions}</dd>

            <dt>Long</dt>
            <dd>{playerSeason.PassingLong}</dd>

            <dt>Sacks</dt>
            <dd>{playerSeason.PassingSacks}</dd>

            <dt>Sack Yards</dt>
            <dd>{playerSeason.PassingSackYards}</dd>
          </dl>
        }

        <dl>
          <h2>Rushing</h2>

          <dt>Rushing Attempts</dt>
          <dd>{playerSeason.RushingAttempts}</dd>

          <dt>Rushing Yards</dt>
          <dd>{playerSeason.RushingYards}</dd>

          <dt>Rushing Yards per Attempt</dt>
          <dd>{playerSeason.RushingYardsPerAttempt}</dd>

          <dt>Rushing Touchdowns</dt>
          <dd>{playerSeason.RushingTouchdowns}</dd>

          <dt>Rushing Long</dt>
          <dd>{playerSeason.RushingLong}</dd>
        </dl>

        {!isQB &&
          <dl>
            <h2>Receiving</h2>

            <dt>Receiving Targets</dt>
            <dd>{playerSeason.ReceivingTargets}</dd>

            <dt>Receiving Recptions</dt>
            <dd>{playerSeason.Receptions}</dd>

            <dt>Receiving Yards</dt>
            <dd>{playerSeason.ReceivingYards}</dd>

            <dt>Receiving Yards per Reception</dt>
            <dd>{playerSeason.ReceivingYardsPerReception}</dd>

            <dt>Receiving Touchdowns</dt>
            <dd>{playerSeason.ReceivingTouchdowns}</dd>

            <dt>Receiving Long</dt>
            <dd>{playerSeason.ReceivingLong}</dd>
          </dl>
        }

        <dl>
          <h2>Fumbles</h2>

          <dt>Fumbles</dt>
          <dd>{playerSeason.Fumbles}</dd>

          <dt>Fumbles Lost</dt>
          <dd>{playerSeason.FumblesLost}</dd>
        </dl>

        {!isQB &&
          <dl>
            <h2>Returns</h2>

            <dt>Punt Returns</dt>
            <dd>{playerSeason.PuntReturns}</dd>

            <dt>Punt Return Yards</dt>
            <dd>{playerSeason.PuntReturnYards}</dd>

            <dt>Punt Return Yards per Attempt</dt>
            <dd>{playerSeason.PuntReturnYardsPerAttempt}</dd>

            <dt>Punts Returned for Toucdowns</dt>
            <dd>{playerSeason.PuntReturnTouchdowns}</dd>

            <dt>Punt Return Long</dt>
            <dd>{playerSeason.PuntReturnLong}</dd>

            <dt>Kickoff Returns</dt>
            <dd>{playerSeason.KickReturns}</dd>

            <dt>Kickoff Return Yards</dt>
            <dd>{playerSeason.KickReturnYards}</dd>

            <dt>Kickoff Return Yards per Attempt</dt>
            <dd>{playerSeason.KickReturnYardsPerAttempt}</dd>

            <dt>Kickoffs Returned for Touchdowns</dt>
            <dd>{playerSeason.KickReturnTouchdowns}</dd>

            <dt>Kickoff Return Long</dt>
            <dd>{playerSeason.KickReturnLong}</dd>
          </dl>
        }
      </div>
    );
  }
}
