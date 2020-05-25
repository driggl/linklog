# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authorize!, only: :create

  def show
    render json: serializer.new(current_user), status: :ok
  end

  private

  def serializer
    UserSerializer
  end
end
