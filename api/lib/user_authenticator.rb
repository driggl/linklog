# frozen_string_literal: true

class UserAuthenticator
  attr_reader :adapter, :access_token

  delegate :user, to: :adapter

  def initialize(code: nil, login: nil, password: nil)
    @adapter =
      if code.blank?
        AuthAdapters::Standard.new(login, password)
      else
        AuthAdapters::Github.new(code)
      end
  end

  def call
    adapter.call

    set_access_token
  end

  private

  def set_access_token
    @access_token = user.access_token.presence || user.create_access_token
  end
end
