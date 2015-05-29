FactoryGirl.define do
  factory :rhyme do
    title            'Rhyme Title'
    original_text    "This is some text to start out. Isn't this great?!"
    rhymed_text      "This is some text to start out. Now it rhymes something about."
    visibility       0
    user

    trait :public do
      visibility  0
    end

    trait :private do
      visibility  1
    end
  end
end