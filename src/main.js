window.addEventListener('load', () => {
  showFlashCards();

  const addFlashcardButton = document.querySelector('#add-flashcard');

  addFlashcardButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    // gets the values from the input fields
    const question = document.querySelector('input[name="question"]');
    const answer = document.querySelector('input[name="answer"]');
    localStorage.setItem(question.value, answer.value);

    // clears the input fields
    question.value = '';
    answer.value = '';

    showFlashCards();
  });

  function showFlashCards() {
    console.log('showFlashCards');

    const flashcardContainer = document.querySelector('#flashcard-container');
    flashcardContainer.innerHTML = '';
    

    // <div class="min-w-[300px] min-h-[300px] rounded overflow-hidden shadow-lg flex justify-center items-center">
    //   <h1 class="question">Question</h1>
    //   <h1 class="answer" class="hidden">Answer</h1>
    //   </div>
    // </div>
    Object.keys(localStorage).sort().forEach(function(key){
      const flashcard = document.createElement('div');
      flashcard.classList.add('min-h-[300px]', 'min-w-[300px]', 'max-w-[300px]', 'max-h-[300px]', 'rounded', 'overflow-hidden', 'shadow-lg', 'p-2', 'flex', 'flex-wrap', 'justify-center', 'items-center', 'relative', 'bg-green-100', 'flip-in-ver-left');
      flashcard.addEventListener('click', (event) => {
        event.preventDefault();
        const cardState = event.currentTarget.querySelector('.card-state');
        const question = event.currentTarget.querySelector('.question');
        const answer = event.currentTarget.querySelector('.answer');
        cardState.innerText = cardState.innerText === 'Question' ? 'Answer' : 'Question';
        cardState.classList.toggle('bg-green-500');
        cardState.classList.toggle('bg-pink-500');
        question.classList.toggle('hidden');
        answer.classList.toggle('hidden');
        flashcard.classList.toggle('flip-in-ver-right');
        flashcard.classList.toggle('bg-pink-100');
      });

      const cardState = document.createElement('span');
      cardState.classList.add('card-state', 'absolute', 'top-0', 'right-0', 'p-2', 'text-xs', 'font-bold', 'text-white', 'bg-green-500', 'rounded-bl');
      cardState.innerText = 'Question';


      const question = document.createElement('h2');
      question.classList.add('question');
      question.innerText = key;

      const answer = document.createElement('h2');
      answer.classList.add('answer', 'hidden');
      answer.innerText = localStorage.getItem(key);

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.innerText = 'X';
      deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem(key);
        showFlashCards();
      });




      flashcard.appendChild(question);
      flashcard.appendChild(answer);
      flashcard.appendChild(deleteButton);
      flashcard.appendChild(cardState);

      const flashcardContainer = document.querySelector('#flashcard-container');
      flashcardContainer.appendChild(flashcard);
   });

  }
});