class Rhymelation < ActiveRecord::Base
  belongs_to :word
  belongs_to :word_rhyme, class_name: 'Word'
end
