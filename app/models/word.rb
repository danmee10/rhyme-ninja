class Word < ActiveRecord::Base
  has_many :rhymelations
  has_many :word_rhymes, through: :rhymelations
  has_many :inverse_rhymelations, class_name: 'Rhymelation', foreign_key: "word_rhyme_id"
  has_many :inverse_word_rhymes, through: :inverse_rhymelations, source: :word

  def rhymes
    rhyme_list.count > 1 ? rhyme_list : fetch_rhymes
  end

  def rhyme_list
    word_rhymes + inverse_word_rhymes
  end

private
  def fetch_rhymes
    results = Faraday.get "http://rhymebrain.com/talk?function=getRhymes&word=#{spelling}"
    data = JSON.parse(results.body)

    data.each do |d|
      w = Word.find_or_create_by(spelling: d['word'])
      Rhymelation.find_or_create_by(word_rhyme_id: w.id, word_id: self.id)
    end

    Word.find(self.id).rhyme_list
  end
end
