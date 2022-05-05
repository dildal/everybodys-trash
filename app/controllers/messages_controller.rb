class MessagesController < ApplicationController
    skip_before_action :authorized, only: [:show]
    def create
        chat_id = [params[:sender_id].to_i, params[:receiver_id].to_i].sort.join("_")
        message = Message.create!({**message_params, chat_id: chat_id, read: false})
        
        # ActionCable.server.broadcast("messages_channel_#{chat_id}", MessageSerializer.new(message).as_json)
        ActionCable.server.broadcast("messages_channel", MessageSerializer.new(message).as_json)
        head :ok
    end

    def show
        messages = Message.where(chat_id: params[:id]).all
        if messages
            render json: messages, status: :ok
        else
            render json: {errors: ['No messages found']}, status: :not_found
        end
    end

    def unread
        unread_messages = Message.where(receiver_id: params[:id], read: false).all
        if unread_messages
            render json: unread_messages, status: :ok
        else
            render json: [errors: "No unread Messages"]
        end
    end

    private

    def message_params
        params.permit(:sender_id, :receiver_id, :text)
    end

end
