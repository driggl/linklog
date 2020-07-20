# frozen_string_literal: true

class AuthorSerializer < ApplicationSerializer
  attribute :login
  attribute :name
  attribute :url
  attribute :avatar_url
end
