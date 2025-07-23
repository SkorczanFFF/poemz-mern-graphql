export type UserType = {
  name: string;
  id: string;
  email: string;
  poems: PoemType[];
  comments: CommentType[];
};

export type PoemType = {
  id: string;
  title: string;
  content: string;
  date: Date;
  user: UserType;
  comments: CommentType[];
};

export type CommentType = {
  id: string;
  text: string;
  date: Date;
  poem: PoemType;
  user: UserType;
};
