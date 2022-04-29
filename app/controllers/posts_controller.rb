class PostsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]
    
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def index
        render json: Post.all, status: :ok
    end

    def create
        newPost = Post.create!(post_params)
        render json: newPost, status: :created
    end

    private

    def post_params
        params.permit(:user_id, :title, :body)
    end

    def record_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: 422
    end
end
