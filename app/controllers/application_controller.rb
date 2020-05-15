# frozen_string_literal: true

require 'jsonapi_errors_handler'

class ApplicationController < ActionController::API
  class AuthorizationError < StandardError; end

  # rescue_from UserAuthenticator::Oauth::AuthenticationError, with: :authentication_oauth_error
  # rescue_from UserAuthenticator::Standard::AuthenticationError, with: :authentication_standard_error

  include JsonapiErrorsHandler

  ErrorMapper.map_errors!(
    'ActiveRecord::RecordNotFound' => 'JsonapiErrorsHandler::Errors::NotFound',
    'AuthorizationError' => 'JsonapiErrorsHandler::Errors::Forbidden'
  )
  rescue_from ::StandardError, with: ->(e) { handle_error(e) }
end
