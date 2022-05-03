class MessagesController < ApplicationController
    def create
        message = Message.create!(message_params)
        render json: message, status: :ok
    end

    private

    def message_params
        params.permit(:sender_id, :receiver_id, :text)
    end
    
end
