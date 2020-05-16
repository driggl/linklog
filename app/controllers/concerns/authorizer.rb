# frozen_string_literal: true

module Authorizer
  extend ActiveSupport::Concern

  class AuthorizationError < StandardError; end

  included do
    before_action :authorize!
  end

  def authorize!
    raise AuthorizationError unless current_user
  end

  def access_token
    provided_token = request.authorization&.gsub(/\ABearer\s/, '')
    @access_token = AccessToken.find_by(token: provided_token)
  end

  def current_user
    @current_user = access_token&.user
  end
end
