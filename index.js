window.addEventListener('DOMContentLoaded', (event) => {
  const submitButtonEl = document.getElementById('submit-btn');
  const addButtonEl = document.getElementById('add-btn');
  const scoreContainerEl = document.getElementById('scores-container');
  const nameInputEl = document.getElementById('name-input');
  const newScoreString = '<label>Score</label><input class="score-input" type="number" min="18" value="">';

  async function getStats(obj) {
    console.log(obj)
    try {
      const response = await fetch('http://localhost:3000/getData', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const results = await response.json();
      console.log('results', results)
      } catch(e) {
        console.log(e)
      }
    }

    function getFormData(e) {
      e.preventDefault();
      const scoreInputs = document.querySelectorAll('.score-input');
      const scores = [];
      const name = nameInputEl.value;
      scoreInputs.forEach((oneScore)=> {
        if (oneScore.value !== '') scores.push(+oneScore.value)
      });
     getStats({name, scores})

    }

    function addNewScore() {
      scoreContainerEl.insertAdjacentHTML('beforeend', newScoreString);
    }

    submitButtonEl.addEventListener('click', (e)=>getFormData(e));
    addButtonEl.addEventListener('click', addNewScore);

});

async function getStats(obj) {
  try {
    const response = await fetch('http://localhost:3000/getData', {
      method: 'POST',
      body: obj,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const results = await response.json();
    console.log('results', results)
    } catch(e) {
      console.log(e)
    }
  }


  // const test = JSON.stringify({
  //   "name": "Jesse",
  //   "scores": [
  //     109,
  //     113,
  //     109,
  //     104,
  //     121,
  //     125,
  //     105,
  //     114,
  //     107
  //   ]
  // });
  // getStats(test)