export const TOKEN_KEY = "token";
export const USER_DATA_KEY = "userData";
export const DEFAULT_OPTION_TITLE = "Option";
export const DEFAULT_QUESTION_TITLE = "Question";
export const DEFAULT_FORM_TITLE = "Untitled Form";
export const BASE_URL = "https://survey-app-server-three.vercel.app/api/v1";
export const DEFAULT_QUESTION_TYPE: QuestionType = "short_text";
export const DEFAULT_FORM_DESCRIPTION = "Add a description to your form";

export type QuestionType = "short_text" | "paragraph" | "multiple_choice" | "";

export interface Data {
  username?: string;
  password: string;
  email: string;
}

export interface User {
  user_id: string;
  username: string;
  email: string;
}

export interface SignInResponse {
  message: string;
  token: string;
  user: User;
}

export interface Option {
  id?: string;
  value?: string;
  title?: string;
  option_id?: string;
}
export interface Question {
  id?: number;
  question_id?: string;
  title: string;
  type: QuestionType;
  isRequired: boolean;
  options?: Option[];
}

interface Question2 {
  question_id: string;
  form_id: string;
  question_text: string;
  question_type: QuestionType;
  is_required: boolean;
  created_at: string;
  updated_at: string;
}

export interface Form {
  form_id?: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface FormQuestionProps {
  question: Question;
  onDelete: () => void;
  addQuestion: () => void;
  onChange: (question: Question) => void;
}

export interface UserProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface FormUser {
  form_id: string;
  title: string;
  description: string;
  updated_at: string;
  is_active: boolean;
}

export interface Answer {
  response_answer_id?: string;
  response_id?: string;
  question_id?: string;
  answer_text?: string;
  option_id?: string | null;
}

export interface Response {
  form_id: string;
  responses: Answer[];
}

interface Response2 {
  response_id: string;
  form_id: string;
  user_id: string;
  submitted_at: string;
  answers: Answer[];
}

export interface Results {
  result: {
    questions: Question2[];
    responses: Response2[];
  };
}
