class RemovePictureFromTrashes < ActiveRecord::Migration[7.0]
  def change
    remove_column :trashes, :picture, :string
  end
end
