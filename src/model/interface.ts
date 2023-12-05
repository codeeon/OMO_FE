export interface SelectedInfoType {
  placeName: string;
  addressName: string;
  categoryName: string;
}

export interface Contents {
  postId: string;
  userId: string;
  categoryName: string;
  locationName: string;
  content: string;
  imageURL: string[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}
