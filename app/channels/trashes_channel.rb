class TrashesChannel < ApplicationCable::Channel

    def subscribed
      stream_from "trashes_channel"
    end
  
    # def receive(data)
    #   usersWithTrashOnWishlist = data["tags"].map do |tag|
    #     User.joins(:wishes).where(wishes: {name: tag["text"]})
    #   end
    #   ActionCable.server.broadcast("trashes_channel", TrashSerializer.new(data).as_json)
    #   usersWithTrashOnWishlist.each {|user| UserChannel.broadcast_to(user, Trash.trash_notification)}
    # end
  
    def unsubscribed
      
    end
  end