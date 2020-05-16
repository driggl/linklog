# frozen_string_literal: true

require 'jsonapi_errors_handler'

class ApplicationController < ActionController::API
  include JsonapiErrorsHandler

  ErrorMapper.map_errors!(
    'ActiveRecord::RecordNotFound' => 'JsonapiErrorsHandler::Errors::NotFound',
    'Authorizer::AuthorizationError' => 'JsonapiErrorsHandler::Errors::Forbidden'
  )

  rescue_from ::StandardError, with: ->(e) { handle_error(e) }
  rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error

  include Authorizer
  include Authenticator

  private

  def handle_validation_error(error)
    render_error(
      JsonapiErrorsHandler::Errors::Invalid.new(errors: error.record.errors.to_h)
    )
  end
end
