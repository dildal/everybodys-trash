class MessageSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :receiver_id, :text
end
