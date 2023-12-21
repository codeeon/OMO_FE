export interface SelectedInfoType {
  placeName: string;
  addressName: string;
  categoryName: string;
  latitude: string;
  longitude: string;
}

export interface MapLocationType {
  center: {
    lat: number | null;
    lng: number | null;
  };
  isPanto: boolean;
  bounds: BoundsType | null;
}

export interface MapCurrentLocationType {
  lat: number | null;
  lng: number | null;
  placeName: string | null;
}

export interface BoundsType {
  ha: number;
  oa: number;
  pa: number;
  qa: number;
}

export interface ThemeType {
  toggleTheme: () => void;
  themeMode: string | null;
}

// 여기부터 실제 서버 타입
export interface PostType {
  User: {
    nickname: string;
  };
  Category: {
    categoryName: string;
  };
  Location: {
    locationId: number;
    storeName: string;
    address: string;
    starAvg: number;
  };
  postId: number;
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
    Category: {
      categoryId: number;
      categoryName: string;
    };
    storeName: string;
    address: string;
    latitude: string;
    longitude: string;
  };
  Comments: CommentType[];
}

export interface CommentType {
  commentId: number;
  content: string;
  createdAt: string;
  User: {
    imgUrl: string;
    nickname: string;
  };
}

export interface HotPostsType {
  Category: { categoryName: string };
  Location: { storeName: string; latitude: number; longitude: number };
  content: string;
  imgUrl: string[];
}

export interface RecentPostsType {
  User: { nickname: string };
  commentCount: number;
  content: string;
  createdAt: string;
  imgUrl: string[];
  likeCount: number;
  postId: number;
}

export interface CommentPostsType {
  User: { nickname: string };
  commentCount: number;
  content: string;
  createdAt: string;
  imgUrl: string[];
  likeCount: number;
  postId: number;
}

export interface LocationType {
  Category: { categoryName: string };
  Posts: { postId: number; imgUrl: string; star: number }[];
  address: string;
  distance: number;
  latitude: string;
  locationId: number;
  longitude: string;
  starAvg: number;
  postCount: number;
  storeName: string;
}

export interface PostContentType {
  content: string;
  categoryName: string;
  imgUrl: string[];
  storeName: string;
  address: string;
  latitude: string;
  longitude: string;
  star: number;
}

export interface PostCommentType {
  PostId: number | undefined;
  content: string;
}
