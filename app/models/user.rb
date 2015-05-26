class User < ActiveRecord::Base
  has_many :authorizations, dependent: :destroy
  has_many :rhymes, dependent: :destroy

  enum group: {
    standard: 0,
    anon: 1
  }

  def self.create_from_hash!(hash)
    create(name: hash['info']['name'])
  end

  def self.find_convert_or_create(hash, user)
    return create_from_hash!(hash) if user.nil?
    if user.standard?
      user
    else
      user.update!(group: 'standard')
      user
    end
  end

  def unauthorized_provider_names
    Authorization::PROVIDERS.keys - authorizations.pluck(:provider)
  end
end
