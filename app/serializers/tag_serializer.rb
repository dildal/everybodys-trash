class TagSerializer < ActiveModel::Serializer
  attributes :id, :text
  has_one :trash
end
