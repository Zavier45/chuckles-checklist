import React from "react";
import "./App.css";
import {
  postJoke,
  getAllJokes,
  changJokeStatus,
  deleteJoke,
} from "./services/jokeService.jsx";

export const App = () => {
  const [userJoke, setUserJoke] = React.useState("");
  const [allJokes, setAllJokes] = React.useState([]);
  const [untoldJokes, setUntoldJokes] = React.useState([]);
  const [toldJokes, setToldJokes] = React.useState([]);
  let toldJokeCount = toldJokes.length;
  let untoldJokeCount = untoldJokes.length;

  React.useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
    });
  }, []);

  React.useEffect(() => {
    setUntoldJokes(allJokes.filter((joke) => joke.told === false));
    setToldJokes(allJokes.filter((joke) => joke.told === true));
  }, [allJokes]);

  const addJokeToDatabase = () => {
    postJoke({ text: userJoke, told: false }).then((response) => {
      getAllJokes().then((jokesArray) => {
        setAllJokes(jokesArray);
      });
    });
  };

  return (
    <React.Fragment>
      <article>
        <header>
          <h1>Chuckle's Checklist</h1>
        </header>
        <div>
          <input
            className="joke-input"
            type="text"
            placeholder="New One Liner"
            value={userJoke}
            onChange={(event) => {
              setUserJoke(event.target.value);
            }}
          />
          <button
            className="joke-btn btn-primary"
            onClick={() => addJokeToDatabase()}
          >
            Save Joke
          </button>
        </div>
        <article className="joke-lists-container">
          <section>
            <div className="joke-list-container">
              <h2>
                Untold Jokes:
                {untoldJokeCount}
              </h2>
              <ul type="1">
                {untoldJokes.map((joke) => {
                  return (
                    <li className="joke-list-item" key={joke.id}>
                      <p className="joke-list-item-text"> {joke.text}</p>
                      <button
                        className="joke-btn btn-secondary"
                        onClick={() => {
                          joke.told = !joke.told;
                          changJokeStatus(joke).then(() => {
                            getAllJokes().then((jokesArray) => {
                              setAllJokes(jokesArray);
                            });
                          });
                        }}
                      >
                        Tell
                      </button>
                      <button
                        className="joke-btn btn-tertiary"
                        onClick={() => {
                          deleteJoke(joke).then(() => {
                            getAllJokes().then((jokesArray) => {
                              setAllJokes(jokesArray);
                            });
                          });
                        }}
                      >
                        Delete Joke
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="joke-list-container">
              <h2>Told Jokes: {toldJokeCount}</h2>
              <ul type="1">
                {toldJokes.map((joke) => {
                  return (
                    <li className="joke-list-item" key={joke.id}>
                      <p className="joke-list-item-text"> {joke.text}</p>
                      <button
                        className="joke-btn btn-secondary"
                        onClick={() => {
                          joke.told = !joke.told;
                          changJokeStatus(joke).then(() => {
                            getAllJokes().then((jokesArray) => {
                              setAllJokes(jokesArray);
                            });
                          });
                        }}
                      >
                        Don't Tell
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </article>
      </article>
    </React.Fragment>
  );
};
