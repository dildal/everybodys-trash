class WishSerializer < ActiveModel::Serializer
  attributes :id, :category, :name
  has_one :user
end
