/* tslint:disable */
import { GraphQLResolveInfo } from 'graphql';
/**
 * This file is auto-generated by graphql-schema-typescript
 * Please note that any changes in this file may be overwritten
 */
 

/*******************************
 *                             *
 *          TYPE DEFS          *
 *                             *
 *******************************/
export interface Query {
  user?: User;
  conversation?: Conversation;
  conversations?: Array<Conversation | null>;
}

export interface User {
  id: string;
  username: string;
  publicKey: string;
}

export interface Conversation {
  id: string;
  from: User;
  to: User;
  messages?: Array<Message | null>;
  fromKey?: string;
  toKey?: string;
  iv?: string;
}

export interface Message {
  body: string;
  author: User;
  timestamp: string;
}

export interface Mutation {
  createUser?: AuthResponse;
  createConversation?: Conversation;
  createSymmetricKey: boolean;
  sendMessage: boolean;
  login?: AuthResponse;
}

export interface CreateUserInput {
  username: string;
  publicKey: string;
  password: string;
}

export interface AuthResponse {
  user?: User;
  token?: string;
}

export interface CreateSymmetricKeyInput {
  conversationId: string;
  fromKey: string;
  toKey: string;
  iv: string;
}

export interface SendMessageInput {
  conversationId: string;
  body: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface Subscription {
  conversation?: Conversation;
  message?: Message;
}

/*********************************
 *                               *
 *         TYPE RESOLVERS        *
 *                               *
 *********************************/
/**
 * This interface define the shape of your resolver
 * Note that this type is designed to be compatible with graphql-tools resolvers
 * However, you can still use other generated interfaces to make your resolver type-safed
 */
export interface Resolver {
  Query?: QueryTypeResolver;
  User?: UserTypeResolver;
  Conversation?: ConversationTypeResolver;
  Message?: MessageTypeResolver;
  Mutation?: MutationTypeResolver;
  AuthResponse?: AuthResponseTypeResolver;
  Subscription?: SubscriptionTypeResolver;
}
export interface QueryTypeResolver<TParent = any> {
  user?: QueryToUserResolver<TParent>;
  conversation?: QueryToConversationResolver<TParent>;
  conversations?: QueryToConversationsResolver<TParent>;
}

export interface QueryToUserArgs {
  username?: string;
}
export interface QueryToUserResolver<TParent = any, TResult = any> {
  (parent: TParent, args: QueryToUserArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface QueryToConversationArgs {
  conversationId: string;
}
export interface QueryToConversationResolver<TParent = any, TResult = any> {
  (parent: TParent, args: QueryToConversationArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface QueryToConversationsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserTypeResolver<TParent = any> {
  id?: UserToIdResolver<TParent>;
  username?: UserToUsernameResolver<TParent>;
  publicKey?: UserToPublicKeyResolver<TParent>;
}

export interface UserToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserToUsernameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface UserToPublicKeyResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ConversationTypeResolver<TParent = any> {
  id?: ConversationToIdResolver<TParent>;
  from?: ConversationToFromResolver<TParent>;
  to?: ConversationToToResolver<TParent>;
  messages?: ConversationToMessagesResolver<TParent>;
  fromKey?: ConversationToFromKeyResolver<TParent>;
  toKey?: ConversationToToKeyResolver<TParent>;
  iv?: ConversationToIvResolver<TParent>;
}

export interface ConversationToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ConversationToFromResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ConversationToToResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ConversationToMessagesResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ConversationToFromKeyResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ConversationToToKeyResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ConversationToIvResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MessageTypeResolver<TParent = any> {
  body?: MessageToBodyResolver<TParent>;
  author?: MessageToAuthorResolver<TParent>;
  timestamp?: MessageToTimestampResolver<TParent>;
}

export interface MessageToBodyResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MessageToAuthorResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MessageToTimestampResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationTypeResolver<TParent = any> {
  createUser?: MutationToCreateUserResolver<TParent>;
  createConversation?: MutationToCreateConversationResolver<TParent>;
  createSymmetricKey?: MutationToCreateSymmetricKeyResolver<TParent>;
  sendMessage?: MutationToSendMessageResolver<TParent>;
  login?: MutationToLoginResolver<TParent>;
}

export interface MutationToCreateUserArgs {
  input: CreateUserInput;
}
export interface MutationToCreateUserResolver<TParent = any, TResult = any> {
  (parent: TParent, args: MutationToCreateUserArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationToCreateConversationArgs {
  username: string;
}
export interface MutationToCreateConversationResolver<TParent = any, TResult = any> {
  (parent: TParent, args: MutationToCreateConversationArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationToCreateSymmetricKeyArgs {
  input: CreateSymmetricKeyInput;
}
export interface MutationToCreateSymmetricKeyResolver<TParent = any, TResult = any> {
  (parent: TParent, args: MutationToCreateSymmetricKeyArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationToSendMessageArgs {
  input: SendMessageInput;
}
export interface MutationToSendMessageResolver<TParent = any, TResult = any> {
  (parent: TParent, args: MutationToSendMessageArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface MutationToLoginArgs {
  input: LoginInput;
}
export interface MutationToLoginResolver<TParent = any, TResult = any> {
  (parent: TParent, args: MutationToLoginArgs, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AuthResponseTypeResolver<TParent = any> {
  user?: AuthResponseToUserResolver<TParent>;
  token?: AuthResponseToTokenResolver<TParent>;
}

export interface AuthResponseToUserResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AuthResponseToTokenResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SubscriptionTypeResolver<TParent = any> {
  conversation?: SubscriptionToConversationResolver<TParent>;
  message?: SubscriptionToMessageResolver<TParent>;
}

export interface SubscriptionToConversationResolver<TParent = any, TResult = any> {
  resolve?: (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo) => TResult;
  subscribe: (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo) => AsyncIterator<TResult>;
}

export interface SubscriptionToMessageArgs {
  conversationId: string;
}
export interface SubscriptionToMessageResolver<TParent = any, TResult = any> {
  resolve?: (parent: TParent, args: SubscriptionToMessageArgs, context: any, info: GraphQLResolveInfo) => TResult;
  subscribe: (parent: TParent, args: SubscriptionToMessageArgs, context: any, info: GraphQLResolveInfo) => AsyncIterator<TResult>;
}
