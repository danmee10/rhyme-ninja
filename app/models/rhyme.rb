class Rhyme < ActiveRecord::Base
  belongs_to :user

  enum visibility: {
    public_rhyme: 0,
    private_rhyme: 1
  }

  scope :public_rhymes, -> { where(visibility: 0) }

  validates :original_text, presence: true
end
