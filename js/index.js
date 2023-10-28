// https://opentdb.com/api.php?amount=7&category=21&difficulty=hard
import * as QizeCalss from './Quiz.js';
let Quiz = QizeCalss.Quiz;

// -----------------------------------------
// get all elements
let form = document.querySelector("#quizOptions");
let categoryMenu = document.querySelector("#categoryMenu");
let difficultyOptions = document.querySelector("#difficultyOptions");
let questionsNumber = document.querySelector("#questionsNumber");
let btn = document.querySelector("#startQuiz");
let myRow = document.querySelector(".questions .container .row");

let questions;
let myQuiz;

// -----------------------------------------

btn.addEventListener("click", async function () {
  let category = categoryMenu.value;
  let difficulty = difficultyOptions.value;
  let number = questionsNumber.value;

  myQuiz = new Quiz(category, difficulty, number);
  questions = await myQuiz.getAllQuestions();
  console.log(questions); // all questions

  let myQuestion = new Question(0);
  console.log(myQuestion);

  form.classList.replace("d-flex", "d-none");
  myQuestion.display();
});

//////////////////////////////////////////////////////////////

class Question {
  constructor(index) {
    this.index = index;
    this.question = questions[index].question;
    this.difficulty = questions[index].difficulty;
    this.correct_answer = questions[index].correct_answer;
    this.category = questions[index].category;
    this.incorrect_answers = questions[index].incorrect_answers;
    this.myAllAnswers = this.getAllAnswers();
    this.isAnswerd = false;
  }

  getAllAnswers() {
    let AllAnswers = [...this.incorrect_answers, this.correct_answer];
    AllAnswers.sort();
    return AllAnswers;
  }

  display() {
    const questionMarkUp = `
      <div
        class="question shadow-lg col-lg-12   p-4 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
      >
        <div class="w-100 d-flex justify-content-between text-light">
          <span class="btn btn-category text-light">${this.category}</span>
          <span class="fs-6 btn btn-questions text-light"> ${this.index + 1} of ${questions.length
      }</span>
        </div>
        <h2 class="text-capitalize h4 text-center text-light">${this.question}</h2>  
        <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
          ${this.myAllAnswers.map((answer) => `<li>${answer}</li>`)
        .toString()
        .replaceAll(",", "")
      }
        </ul>
        <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${myQuiz.score
      } </h2>        
      </div>
    `;

    myRow.innerHTML = questionMarkUp;

    let AllChoicse = document.querySelectorAll(".choices li");
    AllChoicse.forEach((li) => {
      li.addEventListener("click", () => {
        this.checkAnswer(li);
        this.nextQuestion();
      });
    });
  }

  checkAnswer(choice) {
    if (!this.isAnswerd) {
      this.isAnswerd = true;

      if (choice.innerHTML == this.correct_answer) {
        myQuiz.score++;
        choice.classList.add("correct", "animate__animated", "animate__pulse");
      } else {
        choice.classList.add("wrong", "animate__animated", "animate__shakeX");
      }
    }
  }

  nextQuestion() {
    this.index++;

    setTimeout(() => {
      if (this.index < questions.length) {
        let myNewQuestion = new Question(this.index);
        myNewQuestion.display();
      } else {
        let result = myQuiz.showResult();
        myRow.innerHTML = result;
        document.querySelector(".again").addEventListener("click", function () {
        window.location.reload();
        });
      }
    }, 1500);
  }
}
