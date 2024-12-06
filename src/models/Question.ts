export interface Options {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface Question {
  correct_answer: string;
  correct_option: string;
  options?: Options;
  question: string;
}