const ARTICLES = [
  {
    id: 1,
    title: 'Serverless Ruby on AWS Lambda with the Jets Framework',
    lead:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consequatur debitis dignissimos dolor expedita laboriosam mollitia odit perspiciatis, quisquam quos temporibus vero. At eveniet ex neque qui vel voluptates!',
    author: {
      nick: 'krystian50',
      image:
        'https://www.tm-town.com/assets/default_male600x600-79218392a28f78af249216e097aaf683.png'
    }
  },
  {
    id: 2,
    title: 'Serverless Ruby on AWS Lambda with the Jets Framework',
    lead:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consequatur debitis dignissimos dolor expedita laboriosam mollitia odit perspiciatis, quisquam quos temporibus vero. At eveniet ex neque qui vel voluptates!',
    author: {
      nick: 'krystian50',
      image:
        'https://www.tm-town.com/assets/default_male600x600-79218392a28f78af249216e097aaf683.png'
    }
  }
]

export function getArticles() {
  return ARTICLES.slice(0)
}
