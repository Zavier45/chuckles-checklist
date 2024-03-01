export const getAllJokes = () => {
  return fetch("http://localhost:1338/jokes").then((response) =>
    response.json()
  );
};

export const postJoke = async (jokeObject) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jokeObject),
  };

  const response = await fetch("http://localhost:1338/jokes", postOptions);
};

export const changJokeStatus = async (modifiedJokeObject) => {
  const putOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedJokeObject),
  };
  const response = await fetch(
    `http://localhost:1338/jokes/${modifiedJokeObject.id}`,
    putOptions
  );
};

export const deleteJoke = async (deletedJoke) => {
  const deleteOptions = {
    method: "DELETE",
  };
  const response = await fetch(
    `http://localhost:1338/jokes/${deletedJoke.id}`,
    deleteOptions
  );
};
