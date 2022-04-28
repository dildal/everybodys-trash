class TrashesController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    def index
        render json: Trash.all, status: :ok
    end

    def create
        trash = Trash.create!(trash_params)
        render json: trash, status: :created
    end

    def destroy
        trash = Trash.find(params[:id])
        trash.destroy()
        head :no_content
    end

    private

    def trash_params
        params.permit(:title, :description, :picture, :longitude, :latitude, :isHeavy, :category)
    end

    def record_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: 422
    end

    def record_not_found
        render json: {errors: ["Trash not found"]}
    end

end
