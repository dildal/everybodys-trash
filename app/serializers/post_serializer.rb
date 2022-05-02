class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :is_request
  has_one :user
  has_many :comments
end
