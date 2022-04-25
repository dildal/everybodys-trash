class CreateTrashes < ActiveRecord::Migration[7.0]
  def change
    create_table :trashes do |t|
      t.float :latitude
      t.float :longitude
      t.string :picture
      t.string :category
      t.boolean :isHeavy
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
