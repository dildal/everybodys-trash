class CreateWishes < ActiveRecord::Migration[7.0]
  def change
    create_table :wishes do |t|
      t.string :category
      t.string :name
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
