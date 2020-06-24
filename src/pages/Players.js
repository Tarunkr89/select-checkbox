import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SelectedPlayerList from "../components/SelectedPlayerList";
import { PlayerContext } from "../context/PlayerContextProvider";

const Players = () => {
  const {
    selectedPlayers,
    handleChange,
    removePlayerHandler,
    verifyCheck,
    data,
  } = useContext(PlayerContext);

  return (
    <div className="bg">
      <Container className="pt-5">
        <Row>
          <Col md={6}>
            <Col className="card mr-3" md={12}>
              {data.data.country.map((country) => (
                <form key={country.countryId}>
                  <h3>{country.name}</h3>
                  <ul>
                    {country.players.map((player) => {
                      return (
                        <li key={player.id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            {...(verifyCheck(player.id, country.countryId)
                              ? { checked: "true" }
                              : {})}
                            onChange={() =>
                              handleChange(
                                country.countryId,
                                country.name,
                                player
                              )
                            }
                          />
                          <span>{player.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </form>
              ))}
            </Col>
          </Col>
          <Col className="card" md={{ span: 6 }}>
            <SelectedPlayerList
              data={selectedPlayers}
              removePlayerHandler={removePlayerHandler}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Players;
