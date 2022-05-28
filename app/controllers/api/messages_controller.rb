class Api::MessagesController < ApplicationController
    skip_before_action :authorized, only: [:show]
    def create
        chat_id = [params[:sender_id].to_i, params[:receiver_id].to_i].sort.join("_")
        message = Message.create!({**message_params, chat_id: chat_id, read: false})
        head :ok
    end

    # make this an index
    def index
        messages = Message.where(chat_id: params[:chat_id]).all
        if messages
            render json: messages, status: :ok
        else
            render json: {errors: ['No messages found']}, status: :not_found
        end
    end

    # make this 
    def unread
        unread_messages = Message.where(receiver_id: params[:id], read: false).all
        message_notifications = unread_messages.map(&:message_notification)
        if unread_messages
            render json: message_notifications, status: :ok
        else
            render json: [errors: "No unread Messages"]
        end
    end

    # change this to update
    def update
        Message.where(receiver_id: @current_user.id, sender_id: params[:other_guy], read: false).update_all(read: true)
        # puts Message.where(receiver_id: @current_user.id, sender_id: params[:other_guy], read: false)
        head :no_content
    end

    private

    def message_params
        params.permit(:sender_id, :receiver_id, :text)
    end

end
