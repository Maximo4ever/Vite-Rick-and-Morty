import { useEffect, useState } from "react";
import Character from "./Character";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        "https://rickandmortyapi.com/api/character?page=2"
      );
      const data = await response.json();
      setCharacters(data.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row">
          {characters.map((character) => (
            <div className="col-md-4" key={character.id}>
              <Character character={character} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CharacterList;
