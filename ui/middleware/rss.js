const axios = require('axios')
const marked = require('marked')

export default async function(req, res) {
  res.setHeader('Content-Type', 'text/xml; charset=UTF-8')

  const { data } = await axios.get(`https://webdevflow.herokuapp.com/articles`)
  const items = data.data.map((item) => ({
    title: item.attributes.title.replace('&', '$amp;'),
    excerpt: item.attributes.excerpt.replace('&', '$amp;'),
    content: marked(item.attributes.content),
    slug: item.attributes.slug
  }))

  let feed = '<?xml version="1.0" encoding="UTF-8" ?>\n'
  feed += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>'
  feed += '<title>Recent News | WebDevFlow - A linklog for Modern Web Developers</title>'
  feed += '<description>Recent News | WebDevFlow - A linklog for Modern Web Developers</description>'
  feed += '<link>https://webdevflow.com/rss.xml</link>'
  items.forEach((item) => {
    feed += '<item>'
    feed += `<title>${item.title}</title>`
    feed += `<description><![CDATA[${item.content}]]></description>`
    feed += `<link>https://webdevflow.com/articles/${item.slug}</link>`
    feed += '</item>'
  })
  feed += '</channel></rss>'

  res.end(feed)
}
