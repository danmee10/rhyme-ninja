class Authorization < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :user_id, :uid, :provider
  validates_uniqueness_of :uid, :scope => :provider

  PROVIDERS = {
    'twitter' => {"auth_url" => "/auth/twitter"},
    'google_oauth2' => {"auth_url" => "/auth/google_oauth2"},
    'facebook' => {"auth_url" => "/auth/facebook"},
    'instagram' => {"auth_url" => "/auth/instagram"}
  }

  def self.find_from_hash(hash)
    find_by_provider_and_uid(hash['provider'], hash['uid'])
  end

  def self.create_from_hash(hash, user = nil)
    user ||= User.create_from_hash!(hash)
    Authorization.create(user: user, uid: hash['uid'], provider: hash['provider'])
  end

end
