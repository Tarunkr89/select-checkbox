import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Flex } from "../styled";

const SelectedPlayerList = ({ data, removePlayerHandler }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    setSelectedPlayers(data);
  }, [data, setSelectedPlayers]);

  if (
    (selectedPlayers.length === 1 && selectedPlayers[0].players.length === 0) ||
    selectedPlayers.length === 0
  ) {
    return (
      <Flex className="center">
        <h4>No Value Selected</h4>
      </Flex>
    );
  }
  return (
    <div>
      <Container>
        <Row>
          <Col>
            {selectedPlayers.map((country) => (
              <div key={country.countryId}>
                {country.players.length > 0 && <h3>{country.countryName}</h3>}
                {country.players.map((player) => {
                  return (
                    <Flex key={player.id} className="selected-player">
                      {player.name}
                      <div
                        className="remove-button"
                        onClick={() =>
                          removePlayerHandler(player.id, country.countryId)
                        }
                      >
                        X
                      </div>
                    </Flex>
                  );
                })}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SelectedPlayerList;
