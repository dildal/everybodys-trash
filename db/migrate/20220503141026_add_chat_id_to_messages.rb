class AddChatIdToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :chat_id, :string
  end
end
