class WishSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :description, :url, :price

  attribute :id do |obj|
    "#{obj.id}"
  end
end
