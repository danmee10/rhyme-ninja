FactoryGirl.define do
  factory :synonym_relation do
    word
    association :word_synonym, factory: :word
  end

end
