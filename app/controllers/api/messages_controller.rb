class Api::MessagesController < ApplicationController
    skip_before_action :authorized, only: [:show]

    def index
        messages = Message.where(chat_id: params[:chat_id]).all
        if messages
            render json: messages, status: :ok
        else
            render json: {errors: ['No messages found']}, status: :not_found
        end
    end

    def unread
        unread_messages = Message.where(receiver_id: @current_user.id, read: false).all
        message_notifications = unread_messages.map(&:message_notification)
        if unread_messages
            render json: message_notifications, status: :ok
        else
            render json: [errors: "No unread Messages"]
        end
    end

    def update
        Message.where(receiver_id: @current_user.id, sender_id: params[:id], read: false).update_all(read: true)
        head :no_content
    end

    private

    def message_params
        params.permit(:sender_id, :receiver_id, :text)
    end

end
