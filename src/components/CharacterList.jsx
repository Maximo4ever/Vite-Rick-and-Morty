import { useEffect, useState } from "react";
import Character from "./Character";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  function NavPage({ page, setPage }) {
    return (
      <header className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">Page {page}</p>
        <button
          onClick={() => setPage(page + 1)}
          className="btn btn-primary btn-sm"
        >
          Page {page + 1}
        </button>
      </header>
    );
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = await response.json();
      setCharacters(data.results);
      setLoading(false);
    }
    fetchData();
  }, [page]);

  return (
    <div className="container">
      <NavPage page={page} setPage={setPage} />
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
