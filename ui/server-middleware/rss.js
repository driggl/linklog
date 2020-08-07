const axios = require('axios')
const marked = require('marked')

export default async function(req, res) {
  res.setHeader('Content-Type', 'text/xml; charset=UTF-8')

  const { data } = await axios.get(`https://api.webdevflow.com/articles`)
  const items = data.data.map((item) => ({
    id: item.id,
    title: item.attributes.title.replace('&', '$amp;'),
    excerpt: item.attributes.excerpt.replace('&', '$amp;'),
    content: marked(item.attributes.content),
    slug: item.attributes.slug,
    createdAt: (new Date(item.attributes.createdAt)).toUTCString()
  }))

  let feed = '<?xml version="1.0" encoding="UTF-8" ?>\n'
  feed += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>'
  feed += '<title>Recent News | WebDevFlow - A linklog for Modern Web Developers</title>'
  feed += '<description>Recent News | WebDevFlow - A linklog for Modern Web Developers</description>'
  feed += '<category>Web development</category>'
  feed += '<language>en-us</language>'
  if (items.length > 0) {
    feed += `<lastBuildDate>${items[0].createdAt}</lastBuildDate>`
    feed += `<pubDate>${items[0].createdAt}</pubDate>`
  }

  feed += '<link rel="self">https://webdevflow.com/rss.xml</link>'
  items.forEach((item) => {
    feed += '<item>'
    feed += `<guid>https://webdevflow.com/articles/${item.id}</guid>`
    feed += `<title>${item.title}</title>`
    feed += `<description><![CDATA[${item.content}]]></description>`
    feed += `<link>https://webdevflow.com/articles/${item.slug}</link>`
    feed += '</item>'
  })
  feed += '</channel></rss>'

  res.end(feed)
}
