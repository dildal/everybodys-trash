class MessagesChannel < ApplicationCable::Channel

  def subscribed
    stream_from "messages_channel"
  end

  def receive(data)
    message = Message.create!({**data, read: false})
    recevied_user = message.receiver
    ActionCable.server.broadcast("messages_channel", MessageSerializer.new(message).as_json)
    UserChannel.broadcast_to(recevied_user, message.message_notification)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
