class Tag < ApplicationRecord
  belongs_to :trash
  validates :text, presence: true
  validates :text, uniqueness: {scope: trash}
end
