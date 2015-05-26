class Identity < OmniAuth::Identity::Models::ActiveRecord
  has_one :authorization

  validates_presence_of :name, :email
  validates_uniqueness_of :email
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create
end
