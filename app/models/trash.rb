class Trash < ApplicationRecord
    validates :title, :picture, :longitude, :latitude, :category, presence: true
end
