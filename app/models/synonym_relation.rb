class SynonymRelation < ActiveRecord::Base
  belongs_to :word
  belongs_to :word_synonym, class_name: 'Word'
end
