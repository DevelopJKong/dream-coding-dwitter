// 이렇게 let을 사용하는것은 정말 나쁘다고 하셨는데 왜? 정확히 엄청 안좋은거지?
let tweets = [
  {
    id: "1",
    text: "드림코딩 화이팅",
    createdAt: Date.now().toString(),
    name: "jeong",
    username: "jeong",
    url: "https://source.unsplash.com/random/1",
  },
  {
    id: "2",
    text: "안녕하세요",
    createdAt: Date.now().toString(),
    name: "yuzhu",
    username: "yuzhu",
  },
];

export function getAll() {
  return tweets;
}

export function getAllByUsername() {
  return tweets.filter((tweet) => tweet.username === username);
}

export function getById() {
  return tweets.find((tweet) => tweet.id === id);
}

export function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return text;
}

export function remove(id) {
  const tweet = tweets.filter((tweet) => tweet.id !== id);
}
