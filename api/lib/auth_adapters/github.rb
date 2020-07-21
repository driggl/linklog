# frozen_string_literal: true

require 'octokit'

module AuthAdapters
  class Github < UserAuthenticator
    class AuthenticationError < StandardError; end

    attr_reader :user

    def initialize(code)
      @code = code
    end

    def call
      raise AuthenticationError if code.blank?
      raise AuthenticationError if token.try(:error).present?

      prepare_user
    end

    private

    def client
      @client ||=
        Octokit::Client.new(
          client_id: ENV['GITHUB_CLIENT_ID'],
          client_secret: ENV['GITHUB_CLIENT_SECRET']
        )
    end

    def token
      @token ||= client.exchange_code_for_token(code)
    rescue Octokit::NotFound
      raise AuthenticationError
    end

    def user_data
      @user_data ||=
        Octokit::Client.new(
          access_token: token[:access_token]
        ).user.to_h.slice(:login, :avatar_url, :url, :name)
    end

    def prepare_user
      @user =
        if User.exists?(login: user_data[:login])
          User.find_by(login: user_data[:login])
        else
          u = User.new(user_data.merge(provider: 'github'))
          u.build_access_token
          u.save
          u
        end
    end

    attr_reader :code
  end
end
