class TrashSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :picture, :category, :isHeavy, :title, :description
  has_many :tags
end
