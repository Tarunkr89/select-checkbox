import React, { createContext, useState, useCallback } from "react";
import data from "../api.json";
export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
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
    <PlayerContext.Provider
      value={{
        selectedPlayers,
        handleChange,
        removePlayerHandler,
        verifyCheck,
        data,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
