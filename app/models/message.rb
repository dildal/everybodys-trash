class Message < ApplicationRecord
    belongs_to :sender, class_name: 'User'
    belongs_to :receiver, class_name: 'User'

    def message_notficiation
        {"id" => self.id, "sender_id"=> self.sender_id, "sender_name" => self.sender.username}
    end
end
