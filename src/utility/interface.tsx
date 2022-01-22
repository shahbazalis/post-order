export interface UserInfo {
  name: string;
  email: string;
}

export interface LooseObject {
  [key: string]: any;
}

export interface ErrorInfo {
  message: string;
}

export interface PostsInterface {
  page: number;
  posts: {
    created_at: string;
    id: string;
    from_name: string;
    from_id: string;
    message: string;
  }[];
}
