# frozen_string_literal: true

class RegistrationsController < ApplicationController
  skip_before_action :authorize!, only: :create

  def create
    user = User.new(registration_params.merge(provider: 'standard'))
    user.build_access_token
    user.save!
    response.headers['Authorization'] = "Bearer #{user.reload.access_token.token}"
    head :created
  end

  private

  def registration_params
    permitted = params.require(:data).require(:attributes).
      permit(:login, :email, :name, :password) ||
      ActionController::Parameters.new

    permitted[:id] = params[:data][:id]
    permitted
  end
end
