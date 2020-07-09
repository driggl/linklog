const ARTICLES = [
  {
    id: 1,
    title: 'First sample article',
    slug: 'first-sample-article',
    excerpt: 'This is sample content',
    content: 'This is sample content\n\n# Header 1\n\n## Header 2',
    author: {
      id: 11,
      login: 'xjohn',
      avatarUrl: 'https://robohash.org/mario_paucek.png'
    }
  },
  {
    id: 2,
    title: 'Second sample article',
    slug: 'second-sample-article',
    author: {
      id: 22,
      login: 'thomas',
      avatarUrl: 'https://robohash.org/caleb.png'
    }
  },
  {
    id: 3,
    title: 'Third sample article',
    slug: 'third-sample-article',
    author: {
      id: 33,
      login: 'lukas',
      avatarUrl: 'https://robohash.org/caleb.png'
    }
  },
  {
    id: 4,
    title: 'Fourth sample article',
    slug: 'fourth-sample-article',
    author: {
      id: 33,
      login: 'lukas',
      avatarUrl: 'https://robohash.org/caleb.png'
    }
  }
]

export function getArticles(options = {}) {
  return ARTICLES.slice(options.start || 0, options.end)
}

export function findArticleBySlug(slug) {
  return ARTICLES.find((article) => article.slug === slug)
}

export function getArticle() {
  return ARTICLES[0]
}
