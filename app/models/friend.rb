class Friend < ApplicationRecord
    validates :alias, presence: true
    validates :experience, presence: true
end
