import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        result = await fetch('/data/players/2593.json');
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
      console.log(e); // eslint-disable-line
    }
  }

  render() {
    const { player, playerSeason } = this.state;

    return (
      <tr>
        <td>{player.FirstName} {player.LastName}</td>
        <td>{player.Position}</td>
        <td>{player.ByeWeek}</td>
        <td>{playerSeason.FantasyPointsYahoo}</td>
        <td>{playerSeason.Touchdowns}</td>
      </tr>
    );
  }
}
