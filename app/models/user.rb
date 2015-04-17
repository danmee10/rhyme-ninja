class User < ActiveRecord::Base
  has_many :authorizations
  has_many :rhymes, dependent: :destroy

  enum group: {
    standard: 0,
    anon: 1
  }

  def self.create_from_hash!(hash)
    create(name: hash['info']['name'])
  end

  def self.convert_to_standard(anon, name)
    anon.update!(group: 'standard', name: name)
  end

  def unauthorized_provider_names
    Authorization::PROVIDERS.keys - authorizations.pluck(:provider)
  end
end
