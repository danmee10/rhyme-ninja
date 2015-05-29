FactoryGirl.define do
  factory :user do
    name        'User Name'

    factory :user_with_rhymes do
      transient do
        rhymes_count 5
      end

      after(:create) do |user, evaluator|
        create_list(:rhyme, evaluator.rhymes_count, user: user)
      end
    end

    factory :user_with_authorizations do
      transient do
        authorization_count 1
      end

      after(:create) do |user, evaluator|
        create_list(:authorization, evaluator.authorization_count, user: user)
      end
    end

  end
end