class Trash < ApplicationRecord
    validates :title, :picture, :longitude, :latitude, :category, presence: true
    has_many :tags, dependent: :destroy 
end


