# frozen_string_literal: true

class UserSerializer < ApplicationSerializer
  attribute :login
  attribute :name
  attribute :email
  attribute :url
  attribute :avatar_url
end
