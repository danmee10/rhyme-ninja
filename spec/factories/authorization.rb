FactoryGirl.define do
  factory :authorization do
    provider    'FakeProvider'
    uid         'bigoldrandomstring'
    user
  end
end