export interface IInputOptions {
  label: string;
  value: string;
}

export interface IQuestionList {
  question: string;
  options: IInputOptions[];
  rightAnswer: string;
}

export interface IQuestionData {
  [key: string]: {
    question: string;
    option: string;
    right: string;
  };
}
