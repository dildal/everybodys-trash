class Trash < ApplicationRecord
    validates :title, :longitude, :latitude, :category, presence: true
    has_many :tags, dependent: :destroy 
    has_one_attached :picture

    def trash_notification
        {"id" => self.id, "type" => 'trash'}
    end
end


