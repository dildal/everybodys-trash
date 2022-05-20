class Api::TagsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def create
        tag = Tag.create!(tags_params)
        render json: tag, status: :created
    end

    private
    
    def tags_params
        params.permit(:text, :trash_id) 
    end

    def record_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: 422
    end

end
