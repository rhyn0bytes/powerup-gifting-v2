class ExtendedWishSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :url, :price, :user_id

  # attribute :id, id.to_s
end
