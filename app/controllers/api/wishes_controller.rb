class Api::WishesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    
    #do some model scope stuff to make this less of a mess
    def index
        trashes = []
        @current_user.wishes.each do |wish| 
            tags = Tag.where(text: wish.name)
            if tags.length != 0
                tags.each{|tag| trashes.push(tag.trash)}
            end
        end
        render json: trashes, status: :ok
    end

    def create
        wish = @current_user.wishes.create!(wish_params)
        render json: wish, status: :created
    end

    private 
    def record_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: 422
    end

    def wish_params
        params.permit(:name, :category);
    end
end
