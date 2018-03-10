import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SummaryTable from '../player-summary/summary-table';

export default class PlayerDetail extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        playerid: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

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
        </dl>

        <h2>Season Stats</h2>
        <dl>
          <dt>Passing Yards</dt>
          <dd>{playerSeason.PassingYards}</dd>

          <dt>Passing Touchdowns</dt>
          <dd>{playerSeason.PassingTouchdowns}</dd>

          <dt>Passing Interceptions</dt>
          <dd>{playerSeason.PassingInterceptions}</dd>
        </dl>

        <h2>Scoring</h2>
        {this.state.player.PlayerID &&
          <SummaryTable playerid={player.PlayerID} />
        }
      </div>
    );
  }
}
