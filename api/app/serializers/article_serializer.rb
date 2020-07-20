# frozen_string_literal: true

class ArticleSerializer < ApplicationSerializer
  set_type :user
  attribute :title
  attribute :slug
  attribute :content
  attribute :excerpt
  attribute :parsed_content
  attribute :created_at do |model|
    model.created_at&.strftime('%m-%d-%Y')
  end

  belongs_to :user, serializer: AuthorSerializer
end
