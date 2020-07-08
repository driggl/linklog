const ARTICLES = [
  {
    id: 1,
    title: 'First sample article',
    slug: 'first-sample-article',
    author: { avatarUrl: 'https://robohash.org/mario_paucek.png' }
  },
  {
    id: 2,
    title: 'Second sample article',
    slug: 'second-sample-article',
    author: { avatarUrl: 'https://robohash.org/caleb.png' }
  },
  {
    id: 3,
    title: 'Third sample article',
    slug: 'third-sample-article',
    author: { avatarUrl: 'https://robohash.org/caleb.png' }
  },
  {
    id: 4,
    title: 'Fourth sample article',
    slug: 'fourth-sample-article',
    author: { avatarUrl: 'https://robohash.org/caleb.png' }
  }
]

export function getArticles(options = {}) {
  return ARTICLES.slice(options.start || 0, options.end)
}

export function findArticleBySlug(slug) {
  return ARTICLES.find((article) => article.slug === slug)
}
