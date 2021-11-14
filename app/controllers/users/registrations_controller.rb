# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private
  
  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: UserSerializer.new(resource).serializable_hash[:data][:attributes], status: :ok
    else
      render json: {
        message: "#{resource.errors.full_messages.to_sentence}"
      }, status: :unprocessable_entity
    end
  end

end
