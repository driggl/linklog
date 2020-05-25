# frozen_string_literal: true

class ArticleSerializer < ApplicationSerializer
  attribute :title
  attribute :slug
  attribute :content
  attribute :parsed_content
end
