# frozen_string_literal: true

module Authenticator
  extend ActiveSupport::Concern

  included do
    rescue_from AuthAdapters::Github::AuthenticationError, with: :authentication_oauth_error
    rescue_from AuthAdapters::Standard::AuthenticationError, with: :authentication_standard_error
  end

  def authentication_oauth_error
    error = {
      'status' => '401',
      'source' => { 'pointer' => '/code' },
      'title' => 'Authentication code is invalid',
      'detail' => 'You must provide valid code in order to exchange it for token.'
    }
    render json: { 'errors': [error] }, status: :unauthorized
  end

  def authentication_standard_error
    error = {
      'status' => '401',
      'source' => { 'pointer' => '/data/attributes/password' },
      'title' => 'Invalid login or password',
      'detail' => 'You must provide valid credentials in order to exchange them for token.'
    }
    render json: { 'errors': [error] }, status: :unauthorized
  end
end
