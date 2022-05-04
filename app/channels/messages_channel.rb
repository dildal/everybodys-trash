class MessagesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    puts("streaming from message_channel_#{params[:chat_id]}");
    stream_from "messages_channel_#{params[:chat_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
