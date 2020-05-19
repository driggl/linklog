# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:login) { |n| "jsmith#{n}" }
    name { 'John Smith' }
    email { 'john@smith.com' }
    url { 'http://example.com' }
    avatar_url { 'http://example.com/avatar' }
    provider { 'github' }
  end
end
