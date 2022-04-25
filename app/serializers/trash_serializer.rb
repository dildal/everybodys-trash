class TrashSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :picture, :category, :isHeavy, :title, :description
end
