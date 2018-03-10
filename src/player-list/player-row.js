import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class PlayerRow extends Component {
  static propTypes = {
    playerid: PropTypes.string.isRequired,
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
        result = await fetch(`/data/players/${this.props.playerid}.json`);
      } else {
        result = await fetch(`https://api.fantasydata.net/v3/nfl/stats/JSON/Player/${this.props.playerid}`, {
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
    let { twoPointConversion } = 0.0;

    if (playerSeason.TwoPointConversionPasses !== '0') {
      twoPointConversion = playerSeason.TwoPointConversionPasses;
    } else if (playerSeason.TwoPointConversionRuns !== '0') {
      twoPointConversion = playerSeason.TwoPointConversionRuns;
    } else if (playerSeason.TwoPointConversionReceptions !== '0') {
      twoPointConversion = playerSeason.TwoPointConversionReceptions;
    }

    return (
      <tr>
        <td>
          <Link to={`/player-detail/${this.props.playerid}`}>
            {player.FirstName} {player.LastName}
          </Link>
        </td>
        <td>
          <Link to={`/player-summary/${this.props.playerid}`}>
            Summary
          </Link>
        </td>
        <td>{player.Position}</td>
        <td>{player.ByeWeek}</td>
        <td>{playerSeason.FantasyPointsYahoo}</td>
        <td>-</td>{/* Percent Owned */}
        <td>-</td>{/* Projected Ranking */}
        <td>-</td>{/* Actual Ranking */}
        <td>{playerSeason.PassingYards}</td>
        <td>{playerSeason.PassingTouchdowns}</td>
        <td>{playerSeason.PassingInterceptions}</td>
        <td>{playerSeason.RushingAttempts}</td>
        <td>{playerSeason.RushingYards}</td>
        <td>{playerSeason.RushingTouchdowns}</td>
        <td>{playerSeason.ReceivingTargets}</td>
        <td>{playerSeason.Receptions}</td>
        <td>{playerSeason.ReceivingYards}</td>
        <td>{playerSeason.ReceivingTouchdowns}</td>
        <td>{playerSeason.KickReturnTouchdowns}</td>
        <td>{twoPointConversion}</td>{/* TODO: Is this one actually working correctly? */}
        <td>{playerSeason.FumblesLost}</td>
      </tr>
    );
  }
}
