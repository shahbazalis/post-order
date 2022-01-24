export interface UserInfo {
  name: string;
  email: string;
}

export interface LooseObject {
  [key: string]: any;
}

export interface PostInterface {
  created_time: string;
  id: string;
  from_name: string;
  from_id: string;
  message: string;
}

export interface SortedPosts {
  from_name: string;
  post: [];
}

export interface SelectedPostsInterface {
  message: string;
  created_time: string;
}


export  type PostObject = Pick<PostInterface, "message" | "created_time">;

export interface PostDataMap {
    [key: string]: {post : PostObject[];from_name:string}
}