
export class Quiz {
    constructor(category, difficulty, number) {
      this.category = category;
      this.difficulty = difficulty;
      this.number = number;
      this.score = 0;
    }
  
    getApi() {
      return `https://opentdb.com/api.php?amount=${this.number}&category=${this.category}&difficulty=${this.difficulty}`;
    }
  
    async getAllQuestions() {
      let res = await fetch(this.getApi());
      let data = await res.json();
      return data.results;
    }
  
    showResult() {
      return `
        <div
          class="question shadow-lg col-lg-12  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3"
        >
          <h2 class="mb-0 ">
              ${
                this.score == this.number
                  ? `Congratulations 🎉`
                  : `your score is ${this.score} of ${this.number}`
              }
          </h2>
          <button class="again btn btn-primary rounded-pill"><i class="bi bi-arrow-repeat"></i> Try Again</button>
        </div>
      `;
    }
  }