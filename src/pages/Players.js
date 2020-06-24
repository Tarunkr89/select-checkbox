import React, { useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import data from "../api.json";
import SelectedPlayerList from "../components/SelectedPlayerList";

const Players = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handleChange = useCallback(
    (countryId, countryName, player) => {
      let selectedCountry = selectedPlayers.find(
        (country) => Number(country.countryId) === Number(countryId)
      );
      if (selectedCountry) {
        if (
          selectedCountry.players.some(
            (players) => Number(players.id) === Number(player.id)
          )
        ) {
          selectedCountry.players = selectedCountry.players.filter(
            (players) => Number(players.id) !== Number(player.id)
          );
        } else {
          selectedCountry.players.push(player);
        }
        setSelectedPlayers([...selectedPlayers]);
      } else {
        setSelectedPlayers([
          ...selectedPlayers,
          { countryId, countryName, players: [player] },
        ]);
      }
    },
    [selectedPlayers, setSelectedPlayers]
  );

  const verifyCheck = useCallback(
    (id, countryId) => {
      if (selectedPlayers) {
        let selectedCountry = selectedPlayers.find(
          (country) => Number(country.countryId) === Number(countryId)
        );
        if (selectedCountry) {
          const selected = selectedCountry.players.some(
            (player) => Number(player.id) === Number(id)
          );
          return selected;
        }
      }
      return false;
    },
    [selectedPlayers]
  );

  const removePlayerHandler = useCallback(
    (id, countryId) => {
      let selectedCountry = selectedPlayers.find(
        (country) => Number(country.countryId) === Number(countryId)
      );
      if (selectedCountry && selectedCountry.players.length > 0) {
        selectedCountry.players = selectedCountry.players.filter(
          (player) => Number(player.id) !== Number(id)
        );
        verifyCheck(id, countryId);
        setSelectedPlayers([...selectedPlayers]);
      }
    },
    [selectedPlayers, setSelectedPlayers, verifyCheck]
  );

  return (
    <div className="bg">
      <Container>
        <Row>
          <Col className="card" md={6}>
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
          <Col className="card" md={6}>
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
