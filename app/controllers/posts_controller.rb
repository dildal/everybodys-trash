class PostsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]
    
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found


    def index
        render json: Post.all, status: :ok
    end


    def show
        post = Post.find(params[:id])
        render json: post, status: :ok
     end

    def create
        newPost = Post.create!(post_params)
        render json: newPost, status: :created
    end

    def update
        post = Post.find(params[:id])
        post.update(post_edit_params)
        render json: post, status: :ok
    end

    def destroy
        post = Post.find(params[:id])
        post.destroy()
        head :no_content
    end

    private

    def post_params
        params.permit(:user_id, :title, :body)
    end

    def post_edit_params
        params.permit(:title, :body)
    end

    def record_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: 422
    end

    def record_not_found
        render json: {errors: ["Post not found"]}
    end
end
