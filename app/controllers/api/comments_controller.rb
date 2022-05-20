class Api::CommentsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
   
    def create
        comment = Comment.create!(comment_params)
        render json: comment, status: :created
    end

    def update
        comment = Comment.find(params[:id])
        comment.update(update_params)
        render json: comment, status: :ok
    end

    def destroy
        comment = Comment.find(params[:id])
        comment.destroy()
        head :no_content
    end

    private
    
    def update_params
        params.permit(:body)
    end

    def comment_params
        params.permit(:body, :user_id, :post_id)
    end

    def record_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: 422
    end

    def record_not_found
        render json: {errors: ["Comment not found"]}
    end

end
