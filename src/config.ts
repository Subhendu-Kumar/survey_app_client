export const TOKEN_KEY = "token";
export const USER_DATA_KEY = "userData";
export const DEFAULT_OPTION_TITLE = "Option";
export const DEFAULT_QUESTION_TITLE = "Question";
export const DEFAULT_FORM_TITLE = "Untitled Form";
export const BASE_URL = "http://localhost:5000/api/v1";
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

export interface Question {
  id?: number;
  question_id?: string;
  title: string;
  type: QuestionType;
  isRequired: boolean;
  options?: string[];
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