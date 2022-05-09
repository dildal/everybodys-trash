class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :city, :partners

  has_many :wishes
end
