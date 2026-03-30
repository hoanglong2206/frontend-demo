export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  postsCount: number;
  isVerified?: boolean;
}

export interface Post {
  id: string;
  user: User;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
  timestamp: string;
}

export interface Story {
  id: string;
  user: User;
  hasUnread: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
}

function avatar(seed: string) {
  return `https://picsum.photos/seed/${seed}/80/80`;
}

function postImage(seed: string) {
  return `https://picsum.photos/seed/${seed}/600/600`;
}

const userAlex: User = {
  id: "1",
  username: "alex_wonder",
  name: "Alex Wonder",
  avatar: avatar("alex"),
  bio: "📸 Photography enthusiast | ✈️ Travel lover | 🌿 Nature fan",
  followers: 12400,
  following: 832,
  postsCount: 94,
  isVerified: true,
};
const userSara: User = {
  id: "2",
  username: "sara.lifestyle",
  name: "Sara Johnson",
  avatar: avatar("sara"),
  bio: "Living my best life 🌸",
  followers: 8700,
  following: 610,
  postsCount: 67,
};
const userMike: User = {
  id: "3",
  username: "mike_codes",
  name: "Mike Chen",
  avatar: avatar("mike"),
  bio: "💻 Developer | 🎮 Gamer | ☕ Coffee addict",
  followers: 3200,
  following: 290,
  postsCount: 42,
};
const userLuna: User = {
  id: "4",
  username: "luna.art",
  name: "Luna Park",
  avatar: avatar("luna"),
  bio: "🎨 Artist & Illustrator",
  followers: 21300,
  following: 450,
  postsCount: 118,
  isVerified: true,
};
const userJames: User = {
  id: "5",
  username: "travel_james",
  name: "James Wilson",
  avatar: avatar("james"),
  bio: "🗺️ Exploring the world one city at a time",
  followers: 5600,
  following: 720,
  postsCount: 201,
};
const userKate: User = {
  id: "6",
  username: "foodie_kate",
  name: "Kate Miller",
  avatar: avatar("kate"),
  bio: "🍕 Food lover | Recipe creator",
  followers: 9100,
  following: 540,
  postsCount: 155,
};
const userTom: User = {
  id: "7",
  username: "fitness_tom",
  name: "Tom Davis",
  avatar: avatar("tom"),
  bio: "💪 Fitness coach | Healthy living",
  followers: 15700,
  following: 398,
  postsCount: 88,
};
const userLily: User = {
  id: "8",
  username: "nature_lily",
  name: "Lily Thompson",
  avatar: avatar("lily"),
  bio: "🌿 Nature photographer",
  followers: 7300,
  following: 612,
  postsCount: 73,
};

export const mockUsers: User[] = [
  userAlex, userSara, userMike, userLuna, userJames, userKate, userTom, userLily,
];

export const currentUser: User = {
  id: "0",
  username: "you",
  name: "Your Account",
  avatar: avatar("current"),
  bio: "Your Instagram bio goes here ✨",
  followers: 1024,
  following: 256,
  postsCount: 32,
};

export const mockStories: Story[] = [
  { id: "s1", user: userAlex, hasUnread: true },
  { id: "s2", user: userSara, hasUnread: true },
  { id: "s3", user: userMike, hasUnread: false },
  { id: "s4", user: userLuna, hasUnread: true },
  { id: "s5", user: userJames, hasUnread: false },
  { id: "s6", user: userKate, hasUnread: true },
  { id: "s7", user: userTom, hasUnread: false },
  { id: "s8", user: userLily, hasUnread: true },
];

export const mockFeedPosts: Post[] = [
  {
    id: "p1",
    user: userAlex,
    image: postImage("mountain"),
    caption:
      "Golden hour at the summit 🏔️✨ Nothing beats this view after a 6-hour hike! #travel #mountains #adventure",
    likes: 1243,
    comments: 48,
    isLiked: false,
    isSaved: false,
    timestamp: "2h",
  },
  {
    id: "p2",
    user: userSara,
    image: postImage("flowers"),
    caption:
      "Spring is finally here 🌸 Cherry blossoms in full bloom! #spring #nature #beautiful",
    likes: 892,
    comments: 31,
    isLiked: true,
    isSaved: false,
    timestamp: "4h",
  },
  {
    id: "p3",
    user: userLuna,
    image: postImage("art"),
    caption:
      "Finished my latest watercolor piece 🎨 What do you think? #art #watercolor #creative",
    likes: 2107,
    comments: 95,
    isLiked: false,
    isSaved: true,
    timestamp: "6h",
  },
  {
    id: "p4",
    user: userKate,
    image: postImage("food"),
    caption:
      "Homemade pasta from scratch 🍝 Recipe in bio! #foodie #cooking #homemade",
    likes: 1560,
    comments: 72,
    isLiked: false,
    isSaved: false,
    timestamp: "8h",
  },
  {
    id: "p5",
    user: userJames,
    image: postImage("city"),
    caption: "Tokyo at night 🌃 This city never sleeps! #tokyo #travel #japan",
    likes: 3200,
    comments: 144,
    isLiked: true,
    isSaved: false,
    timestamp: "12h",
  },
  {
    id: "p6",
    user: userTom,
    image: postImage("gym"),
    caption:
      "Morning workout done 💪 Consistency is key! #fitness #workout #motivation",
    likes: 987,
    comments: 26,
    isLiked: false,
    isSaved: false,
    timestamp: "1d",
  },
];

export const mockDiscoverPosts: Post[] = [
  ...mockFeedPosts,
  {
    id: "d1",
    user: userLily,
    image: postImage("forest"),
    caption: "Deep in the forest 🌲",
    likes: 743,
    comments: 19,
    isLiked: false,
    isSaved: false,
    timestamp: "2d",
  },
  {
    id: "d2",
    user: userMike,
    image: postImage("desk"),
    caption: "Work from home setup 💻",
    likes: 612,
    comments: 34,
    isLiked: false,
    isSaved: false,
    timestamp: "3d",
  },
  {
    id: "d3",
    user: userAlex,
    image: postImage("beach"),
    caption: "Beach vibes 🌊",
    likes: 1890,
    comments: 57,
    isLiked: false,
    isSaved: false,
    timestamp: "3d",
  },
  {
    id: "d4",
    user: userSara,
    image: postImage("coffee"),
    caption: "Monday coffee ritual ☕",
    likes: 445,
    comments: 12,
    isLiked: false,
    isSaved: false,
    timestamp: "4d",
  },
  {
    id: "d5",
    user: userLuna,
    image: postImage("sketch"),
    caption: "Pencil sketches 🖊️",
    likes: 1122,
    comments: 41,
    isLiked: false,
    isSaved: false,
    timestamp: "5d",
  },
  {
    id: "d6",
    user: userJames,
    image: postImage("paris"),
    caption: "Paris in the rain 🗼",
    likes: 2900,
    comments: 88,
    isLiked: false,
    isSaved: false,
    timestamp: "1w",
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "c1",
    user: userAlex,
    lastMessage: "That photo was stunning! 😍",
    timestamp: "2m",
    unread: 2,
    messages: [
      {
        id: "m1",
        senderId: userAlex.id,
        text: "Hey! How are you doing?",
        timestamp: "10:30 AM",
      },
      {
        id: "m2",
        senderId: "0",
        text: "I'm great! Just got back from hiking 🏔️",
        timestamp: "10:32 AM",
      },
      {
        id: "m3",
        senderId: userAlex.id,
        text: "That sounds amazing! Did you take pictures?",
        timestamp: "10:33 AM",
      },
      {
        id: "m4",
        senderId: "0",
        text: "Of course! Check my latest post 📸",
        timestamp: "10:35 AM",
      },
      {
        id: "m5",
        senderId: userAlex.id,
        text: "That photo was stunning! 😍",
        timestamp: "10:36 AM",
      },
    ],
  },
  {
    id: "c2",
    user: userSara,
    lastMessage: "See you tomorrow!",
    timestamp: "1h",
    unread: 0,
    messages: [
      {
        id: "m1",
        senderId: userSara.id,
        text: "Hey, are we still on for tomorrow?",
        timestamp: "9:00 AM",
      },
      {
        id: "m2",
        senderId: "0",
        text: "Yes! Can't wait 🎉",
        timestamp: "9:05 AM",
      },
      {
        id: "m3",
        senderId: userSara.id,
        text: "See you tomorrow!",
        timestamp: "9:06 AM",
      },
    ],
  },
  {
    id: "c3",
    user: userLuna,
    lastMessage: "Love your new artwork!",
    timestamp: "3h",
    unread: 1,
    messages: [
      {
        id: "m1",
        senderId: "0",
        text: "Your latest post is incredible!",
        timestamp: "7:00 AM",
      },
      {
        id: "m2",
        senderId: userLuna.id,
        text: "Thank you so much! 🎨",
        timestamp: "7:15 AM",
      },
      {
        id: "m3",
        senderId: "0",
        text: "Love your new artwork!",
        timestamp: "7:20 AM",
      },
    ],
  },
  {
    id: "c4",
    user: userJames,
    lastMessage: "Which city next? 🗺️",
    timestamp: "1d",
    unread: 0,
    messages: [
      {
        id: "m1",
        senderId: userJames.id,
        text: "Just landed in Tokyo!",
        timestamp: "Yesterday",
      },
      {
        id: "m2",
        senderId: "0",
        text: "So jealous! How is it?",
        timestamp: "Yesterday",
      },
      {
        id: "m3",
        senderId: userJames.id,
        text: "Which city next? 🗺️",
        timestamp: "Yesterday",
      },
    ],
  },
  {
    id: "c5",
    user: userKate,
    lastMessage: "Recipe shared! Check your DMs",
    timestamp: "2d",
    unread: 0,
    messages: [
      {
        id: "m1",
        senderId: "0",
        text: "Can you share that pasta recipe? 🍝",
        timestamp: "2 days ago",
      },
      {
        id: "m2",
        senderId: userKate.id,
        text: "Recipe shared! Check your DMs",
        timestamp: "2 days ago",
      },
    ],
  },
];

export const mockProfilePosts: Post[] = [
  {
    id: "pp1",
    user: currentUser,
    image: postImage("profile1"),
    caption: "My first post!",
    likes: 120,
    comments: 14,
    isLiked: false,
    isSaved: false,
    timestamp: "1w",
  },
  {
    id: "pp2",
    user: currentUser,
    image: postImage("profile2"),
    caption: "Weekend vibes",
    likes: 89,
    comments: 7,
    isLiked: false,
    isSaved: false,
    timestamp: "2w",
  },
  {
    id: "pp3",
    user: currentUser,
    image: postImage("profile3"),
    caption: "Sunset magic",
    likes: 234,
    comments: 22,
    isLiked: false,
    isSaved: false,
    timestamp: "3w",
  },
  {
    id: "pp4",
    user: currentUser,
    image: postImage("profile4"),
    caption: "Coffee morning",
    likes: 67,
    comments: 5,
    isLiked: false,
    isSaved: false,
    timestamp: "1m",
  },
  {
    id: "pp5",
    user: currentUser,
    image: postImage("profile5"),
    caption: "City lights",
    likes: 301,
    comments: 31,
    isLiked: false,
    isSaved: false,
    timestamp: "1m",
  },
  {
    id: "pp6",
    user: currentUser,
    image: postImage("profile6"),
    caption: "Adventure awaits",
    likes: 155,
    comments: 18,
    isLiked: false,
    isSaved: false,
    timestamp: "2m",
  },
];
