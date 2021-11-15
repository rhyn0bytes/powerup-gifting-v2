class Api::V1::WishesController < ApplicationController
  before_action :authenticate_user!

  def index
    wishes = Wish.where(user_id: current_user.id)
    collection = []
    wishes.each do |wish|
      collection.push(WishSerializer.new(wish).serializable_hash[:data][:attributes])
    end
    render json: collection, status: :ok
  end

  def all_wishes
    users = User.all
    collection = []
    users.each do |user|
      wishes = []
      user.wishes.each do |wish|
        wishes.push(WishSerializer.new(wish).serializable_hash[:data][:attributes])
      end
      fullObj = {
        user: UserSerializer.new(user).serializable_hash[:data][:attributes],
        wishes: wishes
      }
      collection.push(fullObj)
    end
    render json: collection, status: :ok
  end

  def show
    wish = Wish.find(params[:id])
    render json: WishSerializer.new(wish).serializable_hash[:data][:attributes], status: :ok
  end

  def create
    wish = current_user.wishes.create(wish_params)
    render json: WishSerializer.new(wish).serializable_hash[:data][:attributes], status: :ok
  end

  def update
    wish = Wish.find(params[:id])
    wish.update(wish_params)
    render json: WishSerializer.new(wish).serializable_hash[:data][:attributes], status: :ok
  end

  def destroy
    Wish.destroy(params[:id])
  end

  private

  def wish_params
    params.require(:wish).permit(:id, :name, :description, :url, :price)
  end
end
