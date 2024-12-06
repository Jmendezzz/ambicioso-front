export interface Options {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface Question {
  correct_answer: string;
  options?: Options;
  question: string;
}