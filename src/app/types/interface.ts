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
    point?: string;
    rightAnswer?: boolean;
  };
}

export interface IQuestion {
  question: string;
  option: string;
  optionText?: string;
  right: string;
  point?: string;
  rightAnswer?: boolean;
}

export interface IUserData {
  id: string;
  name: string;
  email: string;
  surname: string;
  phoneNumber: string;
  phoneNumberPrefix: string;
}

export interface IRouteLink {
  text: string;
  link: string;
  icon: string;
}
