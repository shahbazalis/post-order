import { PostInfo } from "./PostInfo";

export type PostObject = Pick<PostInfo, "message" | "created_time">;

export interface PostDataMap {
  [key: string]: { post: PostObject[]; from_name: string; from_id: string };
}
