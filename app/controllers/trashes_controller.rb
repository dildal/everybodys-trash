class TrashesController < ApplicationController
    def index
        render json: Trash.all, status: :ok
    end
end
