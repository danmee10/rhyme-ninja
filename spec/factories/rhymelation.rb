FactoryGirl.define do
  factory :rhymelation do
    word
    association :word_rhyme, factory: :word
  end

end
