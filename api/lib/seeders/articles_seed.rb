# frozen_string_literal: true

require 'faker'

module Seeders
  class ArticlesSeed
    def call(count: 100)
      count.times do
        title = Faker::Hipster.sentence
        Article.create(
          title: title,
          content: Array.new(rand(4..10)).map { Faker::Markdown.emphasis }.join(' '),
          user_id: User.pluck(:id).sample,
          slug: Faker::Hipster.words(number: 4).join('-')
        )
      end
    end
  end
end
