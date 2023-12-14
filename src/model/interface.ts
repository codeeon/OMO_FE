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
  imageURL: string;
  categoryName: string;
  districName: string;
  storeName: string;
  address: string;
  latitude: number;
  longitude: number;
  star: number;
}

export interface MapLocationType {
  center: {
    lat: any;
    lng: any;
  };
  isPanto: boolean;
}

export interface ThemeType {
  toggleTheme: () => void;
  themeMode: string | null;
}

// 여기부터 실제 서버 타입
export interface PostType {
  postId: number;
  User: { nickname: string };
  Location: { storName: string; address: string; starAvg: number };
  imgUrl: string[];
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export interface PostDetailType {
  postId: number;
  content: string;
  createdAt: string;
  likeCount: number;
  imgUrl: string[];
  star: number;
  User: {
    nickname: string;
    imgUrl: string;
  };
  Location: {
    address: string;
  };
  Comments: CommentType2[];
}

export interface CommentType2 {
  commentId: number;
  content: string;
  createdAt: string;
  User: {
    imgUrl: string;
    nickname: string;
  };
}

export interface CommentPostType {
  UserId: number;
  PostId: number | undefined;
  content: string;
  createdAt: Date;
}
