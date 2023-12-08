export interface SelectedInfoType {
  placeName: string;
  addressName: string;
  categoryName: string;
  latitude: string;
  longitude: string;
}

export interface ContentType {
  id: string;
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
}

//TODO 유저 데이터 및 컨텐츠 데이터 추가
export interface CommentType {
  id: string;
  postId: string;
  userName: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentLocationType {
  distName: string;
  coord: { lat: number; lng: number };
}
