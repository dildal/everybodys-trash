class MessageSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :receiver_id, :text, :created_at

  has_one :sender
  has_one :receiver 
end
