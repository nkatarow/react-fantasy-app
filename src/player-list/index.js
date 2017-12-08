/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import PlayerRow from '../player-list/player-row';
import Pagination from '../pagination/';

export default class PlayerList extends Component {
  constructor() {
    super();

    this.state = {
      players: [],
      pageOfItems: [],
    };

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this);
  }

  async componentDidMount() {
    const TEST_DATA = true;
    let result;

    try {
      if (TEST_DATA) {
        result = await fetch('/data/players/players-list-adp.json');
      } else {
        result = await fetch('https://api.fantasydata.net/v3/nfl/stats/JSON/FantasyPlayers', {
          headers: { 'Ocp-Apim-Subscription-Key': 'bd237b0dc9074a3f9318d38be3c0d501' },
        });
      }
      const players = await result.json();
      this.setState({
        players,
      });
    } catch (e) {
      console.log(e); // eslint-disable-line
    }
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems });
  }

  render() {
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Position</th>
              <th>Bye</th>
              <th>Fantasy Points</th>
              <th>Touchdowns</th>
            </tr>
          </thead>
          <tbody>
            {this.state.pageOfItems.map(player =>
              <PlayerRow key={player.FantasyPlayerKey} playerid={player.FantasyPlayerKey} />,
            )}
          </tbody>
        </table>

        <Pagination items={this.state.players} onChangePage={this.onChangePage} />
      </section>
    );
  }
}
