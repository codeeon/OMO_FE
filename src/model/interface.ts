export interface SelectedInfoType {
  placeName: string;
  addressName: string;
  categoryName: string;
  latitude: string;
  longitude: string;
}

export interface ContentType {
  id?: number | undefined;
  userId: string;
  categoryName: string;
  locationName: string;
  placeName: string;
  latitude: number;
  longitude: number;
  content: string;
  imageURL: string[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  star: number;
}

//TODO 유저 데이터 및 컨텐츠 데이터 추가
export interface CommentType {
  id?: number | undefined;
  postId: number | undefined;
  userName: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface LocationType {
  id?: number | undefined;
  categoryName: string;
  districName: string;
  storeName: string;
  address: string;
  latitude: number;
  longitude: number;
  star: number;
}
