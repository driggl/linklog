# frozen_string_literal: true

class ArticleSerializer < ApplicationSerializer
  attribute :title
  attribute :slug
  attribute :content
  attribute :excerpt
  attribute :parsed_content

  belongs_to :user
end
