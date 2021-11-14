# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json
  # after_filter :handle_failed_login, :only => :create

  private

  def respond_with(resource, _opts = {})
    render json: UserSerializer.new(resource).serializable_hash[:data][:attributes], status: :ok
  end

  def handle_failed_login
    if failed_login?
      render json: {
        status: 401,
        message: "Invalid email or password."
      }, status: :unauthorized
    end
  end

  def failed_login?
    (options = env["warden"]) && options[:action] == "unauthenticated"
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        # status: 200,
        # message: "Logged out successfully."
      }, status: :ok
    else
      render json: {
        # status: 401,
        # message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end

end
