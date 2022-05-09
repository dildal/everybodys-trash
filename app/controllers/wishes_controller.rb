class WishesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    
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
