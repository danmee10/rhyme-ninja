FactoryGirl.define do
  factory :identity do
    name             'Fake Name'
    email            'fake@email.com'
    password_digest  'encryptedPassword'
  end
end