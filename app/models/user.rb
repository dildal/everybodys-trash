class User < ApplicationRecord
    has_secure_password
    
    has_many :messagee, foreign_key: :receiver_id, class_name: 'Message'  
    has_many :senders, through: :messagee
    has_many :messaged, foreign_key: :sender_id, class_name: 'Message'
    has_many :receivers, through: :messaged
    has_many :posts
    has_many :wishes
    
    validates :username, uniqueness: true
    validates :username, :password_digest, :first_name, :last_name, presence: true


    def partners
        [*self.senders, *self.receivers].uniq
    end
end
