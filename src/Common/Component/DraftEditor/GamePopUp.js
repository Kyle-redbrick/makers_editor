import React, { Component } from "react";
import * as request from "../../Util/HTTPRequest";
import { injectIntl } from "react-intl";

class GamePopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      games: [],
      selectedIndex: null,
      placeholder: props.intl.formatMessage({ id: "ID_GAMEPOPUP_SEARCH_INFO" })
    };
  }
  componentDidMount() {
    const input = document.getElementById("popup_draft_input");
    if (input) input.focus();
  }
  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  getGames = () => {
    const { keyword } = this.state;
    const { intl } = this.props;
    request
      .getPublishedProjectByKeyword({ keyword })
      .then(res => res.json())
      .then(games => {
        this.setState({
          games,
          selectedIndex: null,
          placeholder: intl.formatMessage({ id: "ID_GAMEPOPUP_SEARCH_INFO_ERROR" })
        });
      });
  };

  onChangeKeyword = e => {
    const { intl } = this.props;
    const keyword = e.target.value;
    this.setState({ keyword }, () => {
      if (this.timeout) clearTimeout(this.timeout);
      if (keyword === "") {
        this.setState({
          games: [],
          selectedIndex: null,
          placeholder: intl.formatMessage({ id: "ID_GAMEPOPUP_SEARCH_INFO" })
        });
      } else {
        this.timeout = setTimeout(() => {
          this.getGames();
        }, 200);
      }
    });
  };
  onClickGame = index => {
    const { selectedIndex } = this.state;
    this.setState({ selectedIndex: index === selectedIndex ? null : index });
  };
  onDoubleClickGame = index => {
    const { dismiss, onChangeGame } = this.props;
    if (onChangeGame) onChangeGame(this.state.games[index].pId);
    dismiss();
  };
  onClickConfirm = () => {
    const { dismiss, onChangeGame } = this.props;
    const { games, selectedIndex } = this.state;
    if (onChangeGame) onChangeGame(games[selectedIndex].pId);
    dismiss();
  };

  render() {
    const { keyword, games, selectedIndex, placeholder } = this.state;
    const { intl } = this.props;
    return (
      <div className="popup_draft">
        <div className="popup_draft_title">
          {intl.formatMessage({ id: "ID_GAMEPOPUP_TITLE" })}
          <input
            id="popup_draft_input"
            className="popup_draft_input"
            placeholder={intl.formatMessage({ id: "ID_GAMEPOPUP_SEARCH_INFO2" })}
            value={keyword}
            onChange={this.onChangeKeyword}
          />
        </div>
        <div className="popup_draft_games">
          {games.length > 0 ? (
            games.map((game, index) => {
              return (
                <div
                  key={index}
                  className={`popup_draft_game ${
                    index === selectedIndex ? "popup_draft_game-selected" : ""
                  }`}
                  onClick={() => {
                    this.onClickGame(index);
                  }}
                  onDoubleClick={() => {
                    this.onDoubleClickGame(index);
                  }}
                >
                  <img
                    className="popup_draft_game_image"
                    src={game.icon}
                    alt={game.name}
                  />
                  <section className="popup_draft_game_section">
                    <div className="popup_draft_game_title">{game.name}</div>
                    <div className="popup_draft_game_desc">
                      {game.description.length > 78
                        ? game.description.slice(0, 78) + "..."
                        : game.description}
                    </div>
                    <div className="popup_draft_game_user">
                      <img
                        className="popup_draft_game_user_image"
                        src={game.user.icon}
                        alt={game.user.name}
                      />
                      <div className="popup_draft_game_user_name">
                        {game.user.name}
                      </div>
                    </div>
                  </section>
                </div>
              );
            })
          ) : (
            <div className="popup_draft_game_placeholder">{placeholder}</div>
          )}
        </div>
        <button
          className={`popup_draft_btn ${
            selectedIndex === null ? "popup_draft_btn-disabled" : ""
          }`}
          onClick={() => {
            if (selectedIndex === null) return;
            this.onClickConfirm();
          }}
        >
          {intl.formatMessage({ id: "ID_GAMEPOPUP_ADD_LINK" })}
        </button>
      </div>
    );
  }
}

export default injectIntl(GamePopUp);
