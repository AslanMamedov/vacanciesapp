export interface IInputOptions {
  label: string;
  value: string;
}

export interface IQuestionList {
  question: string;
  options?: IInputOptions[];
}

export interface IQuestionData {
  [key: string]: {
    question: string;
    option: string;
  };
}
