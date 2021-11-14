class UserWishesSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email

  attributes :wishes do |user|
    WishSerializer.new(user.wishes)
  end
end