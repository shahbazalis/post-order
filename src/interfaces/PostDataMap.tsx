interface PostInfo {
  created_time: string;
  id: string;
  from_name: string;
  from_id: string;
  message: string;
}

export type PostObject = Pick<PostInfo, "message" | "created_time">;

export interface PostDataMap {
  [key: string]: { post: PostObject[]; from_name: string };
}
