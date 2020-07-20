# frozen_string_literal: true

class AuthorSerializer < ApplicationSerializer
  set_type :user
  attribute :login
  attribute :name
  attribute :url
  attribute :avatar_url
end
