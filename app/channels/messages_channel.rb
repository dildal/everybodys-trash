class MessagesChannel < ApplicationCable::Channel

  def subscribed
    stream_from "messages_channel"
  end

  def receive(data)
    message = Message.create!({**data, read: false})
    received_user = message.receiver
    ActionCable.server.broadcast("messages_channel", MessageSerializer.new(message).as_json)
    UserChannel.broadcast_to(received_user, message.message_notification) 
  end

  def unsubscribed
      
  end
end
