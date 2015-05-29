class User < ActiveRecord::Base
  has_many :authorizations, dependent: :destroy
  has_many :rhymes, dependent: :destroy

  def self.create_from_hash!(hash)
    create(name: hash['info']['name'])
  end

  def unauthorized_provider_names
    Authorization::PROVIDERS.keys - authorizations.pluck(:provider)
  end
end
