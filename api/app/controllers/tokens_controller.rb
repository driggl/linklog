# frozen_string_literal: true

class TokensController < ApplicationController
  skip_before_action :authorize!, only: :create

  def create
    (authenticator = UserAuthenticator.new(authentication_params)).call
    response.headers['Authorization'] = "Bearer #{authenticator.access_token.token}"
    render json: { token: authenticator.access_token.token, type: 'Bearer' }, status: :ok
  end

  def destroy
    current_user.access_token.destroy
    head :no_content
  end

  private

  def authentication_params
    (standard_auth_params || params.permit(:code)).to_h.symbolize_keys
  end

  def standard_auth_params
    params.dig(:data, :attributes)&.permit(:login, :password)
  end
end
