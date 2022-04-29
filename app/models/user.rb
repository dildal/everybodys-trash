class User < ApplicationRecord
    has_secure_password
    has_many :posts
    validates :username, uniqueness: true
    validates :username, :password_digest, :first_name, :last_name, presence: true
end
