class TrashSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :picture, :category, :isHeavy, :title, :description
  has_many :tags

  include Rails.application.routes.url_helpers

  def picture
    rails_blob_path(object.picture, only_path: true) if object.picture.attached?
  end
end
