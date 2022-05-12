class UserChannel < ApplicationCable::Channel
  def subscribed
    user = User.find(params[:user])
    puts "Subscribed to #{user.username} channel"
    stream_for user
  end

  def unsubscribed
    # stop_all_streams
  end
end
