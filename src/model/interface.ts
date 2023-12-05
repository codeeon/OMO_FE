export interface SelectedInfoType {
  placeName: string;
  addressName: string;
  categoryName: string;
  latitude: string;
  longitude: string;
}

export interface Contents {
  postId: string;
  userId: string;
  categoryName: string;
  locationName: string;
  placeName: string;
  latitude: string;
  longitude: string;
  content: string;
  imageURL: string[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

//TODO 유저 데이터 및 컨텐츠 데이터 추가
export interface Comments {
  commentId: string;
  userName: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}
