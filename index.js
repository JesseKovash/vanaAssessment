window.addEventListener('DOMContentLoaded', (event) => {
  const submitButtonEl = document.getElementById('submit-btn');
  const addButtonEl = document.getElementById('add-btn');
  const scoreContainerEl = document.getElementById('scores-container');
  const nameInputEl = document.getElementById('name-input');
  const nameModalEl = document.getElementById('modal-name');
  const avgModalEl = document.getElementById('modal-avg');
  const handicapModalEl = document.getElementById('modal-handicap');
  const modalEl = document.getElementById('modal');

  const newScoreString = '<label>Score</label><input class="score-input" type="number" min="18" value="">';

  async function getStats(obj) {
    try {
      const response = await fetch('http://localhost:3000/getData', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const results = await response.json();
      showModal(results)
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
      const lastInput = scoreContainerEl.lastChild;
      lastInput.focus()
    };

    function showModal(data) {
      console.log('data: ', data)
      nameModalEl.textContent = data.name;
      avgModalEl.textContent = data.average;
      handicapModalEl.textContent = data.handicap;
      nameInputEl.value = '';
      scoreContainerEl.innerHTML = newScoreString;
      modalEl.style.display = 'block';
    };

    function hideModal() {
      console.log(modalEl.style.display)
      if(modalEl.style.display === 'block') {
        modalEl.style.display = 'none'
      }
    }

    submitButtonEl.addEventListener('click', (e)=>getFormData(e));
    addButtonEl.addEventListener('click', addNewScore);
    document.addEventListener('click', hideModal);

});


