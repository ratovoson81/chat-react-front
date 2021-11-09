import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type ArgsGetGroupePerUser = {
  id: Scalars['Int'];
};

export type ArgsGroupe = {
  name?: Maybe<Scalars['String']>;
  users: Array<Scalars['Int']>;
};

export type ArgsMessageChat = {
  idFrom: Scalars['Int'];
  idTo: Scalars['Int'];
};

export type AuthPayLoad = {
  __typename?: 'AuthPayLoad';
  token: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type Groupe = {
  __typename?: 'Groupe';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  users: Array<ReturnGroupe>;
  messages: Array<Message>;
};

export type IdUser = {
  id: Scalars['Int'];
};

export type LoginAuthReturn = {
  __typename?: 'LoginAuthReturn';
  theUser: User;
  token: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  content: Scalars['String'];
  author: User;
  date: Scalars['DateTime'];
};

export type MessageChat = {
  __typename?: 'MessageChat';
  id: Scalars['Int'];
  content: Scalars['String'];
  from: User;
  to: User;
  date: Scalars['DateTime'];
  mine: Scalars['Boolean'];
};

export type MessageInput = {
  content: Scalars['String'];
  idFrom: Scalars['Int'];
  idTo: Scalars['Int'];
  date: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDraft?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  incrementPostViewCount?: Maybe<Post>;
  signupUser: AuthPayLoad;
  togglePublishPost?: Maybe<Post>;
  loginUser: LoginAuthReturn;
  logout: Scalars['Boolean'];
  isLogged?: Maybe<User>;
  sendMessage: Message;
  createGroupe: Groupe;
};


export type MutationCreateDraftArgs = {
  authorEmail: Scalars['String'];
  data: PostCreateInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationIncrementPostViewCountArgs = {
  id: Scalars['Int'];
};


export type MutationSignupUserArgs = {
  data: UserCreateInput;
};


export type MutationTogglePublishPostArgs = {
  id: Scalars['Int'];
};


export type MutationLoginUserArgs = {
  data?: Maybe<UserLoginInput>;
};


export type MutationSendMessageArgs = {
  data: MessageInput;
};


export type MutationCreateGroupeArgs = {
  data: ArgsGroupe;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  viewCount: Scalars['Int'];
};

export type PostCreateInput = {
  content?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type PostOrderByUpdatedAtInput = {
  updatedAt: SortOrder;
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  draftsByUser?: Maybe<Array<Maybe<Post>>>;
  feed: Array<Post>;
  postById?: Maybe<Post>;
  message: Array<Message>;
  messageByUser: Array<Message>;
  getChat: Array<Message>;
  allUsersMessageByMe: Array<User>;
  allGroupe: Array<Groupe>;
  allGroupeByUser: Array<Groupe>;
};


export type QueryDraftsByUserArgs = {
  userUniqueInput: UserUniqueInput;
};


export type QueryFeedArgs = {
  orderBy?: Maybe<PostOrderByUpdatedAtInput>;
  searchString?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryPostByIdArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryMessageByUserArgs = {
  data: ArgsMessageChat;
};


export type QueryGetChatArgs = {
  data: ArgsMessageChat;
};


export type QueryAllUsersMessageByMeArgs = {
  data: IdUser;
};


export type QueryAllGroupeByUserArgs = {
  data: ArgsGetGroupePerUser;
};

export type ReturnGroupe = {
  __typename?: 'ReturnGroupe';
  userId?: Maybe<Scalars['Int']>;
  groupeId?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}


export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  name: Scalars['String'];
  posts: Array<Post>;
  imageUrl?: Maybe<Scalars['String']>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  posts?: Maybe<Array<PostCreateInput>>;
  image: Scalars['Upload'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};
