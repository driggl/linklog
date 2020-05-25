# frozen_string_literal: true

require 'faker'

module Seeders
  class UsersSeed
    def call(count: 10)
      count.times do
        login = Faker::Internet.username
        u = User.create(
          name: Faker::Name.name,
          email: Faker::Internet.email,
          login: login,
          password: 'secret',
          url: "https://github.com/#{login}",
          avatar_url: Faker::Avatar.image(slug: login, size: "120x120"),
          provider: :standard
        )
      end
    end
  end
end
