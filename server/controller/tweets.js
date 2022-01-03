import * as tweetsRepository from '../data/tweets';

export function getTweets(req, res)  {
    const username = req.query.username;
    const data = username
      ? tweets.filter((tweet) => {
        tweetsRepository.getAllByUsername(username);
        })
      : tweetsRepository.getAll();
    console.log(username);
    res.status(200).json(data);
  }

export function getTweet(req, res)  {
    const id = req.params.id;
    const tweet = tweetsRepository.getById(id);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
}

export function createTweet(req, res){
    const { text, name, username } = req.body;
    const tweet = tweetsRepository.create(text,name,username)
    res.status(201).json(tweet);
}

export function updateTweet(req, res) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweetsRepository.update(id,text);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
}

export function deleteTweet(req, res){
    const id = req.params.id;
    tweetsRepository.remove(id);
    res.sendStatus(204);
}