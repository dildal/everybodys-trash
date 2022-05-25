class TrashesChannel < ApplicationCable::Channel

    def subscribed
      stream_from "trashes_channel"
    end
  
    def receive(data)
      byebug
      trash = Trash.create!(data)
      data[:tags].split(',').each { |tag| Tag.create!({text: tag, trash: trash}) }
      usersWithTrashOnWishlist = trash.tags.map do |tag|
        User.joins(:wishes).where(wishes: {name: tag.text})
      end
      ActionCable.server.broadcast("trashes_channel", TrashSerializer.new(trash).as_json)
      usersWithTrashOnWishlist.each {|user| UserChannel.broadcast_to(user, Trash.trash_notification)}
    end
  
    def unsubscribed
      stop_all_streams
    end
  end