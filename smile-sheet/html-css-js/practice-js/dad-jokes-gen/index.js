// Write your JS code here.

async function addJokeToDOM() {
  try {
    const url = 'https://icanhazdadjoke.com/';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const data = await response.json();

    const jokeP = document.getElementById('joke');
    jokeP.innerText = data.joke;
  } catch (error) {
    console.error(error);
  }
}
addJokeToDOM();

const jokeButton = document.getElementById('get-joke-btn');
jokeButton.addEventListener('click', addJokeToDOM);