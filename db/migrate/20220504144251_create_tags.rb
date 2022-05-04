class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.string :text
      t.references :trash, null: false, foreign_key: true

      t.timestamps
    end
  end
end
