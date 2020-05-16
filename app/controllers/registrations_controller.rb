# frozen_string_literal: true

class RegistrationsController < ApplicationController
  def create
    user = User.create!(registration_params.merge(provider: 'standard'))
    render json: serializer.new(user), status: :created
  end

  private

  def serializer
    UserSerializer
  end

  def registration_params
    params.require(:data).require(:attributes).
      permit(:login, :email, :password) ||
      ActionController::Parameters.new
  end
end
