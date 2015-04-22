class Rhyme < ActiveRecord::Base
  belongs_to :user

  enum visibility: {
    public_rhyme: 0,
    private_rhyme: 1
  }

end
