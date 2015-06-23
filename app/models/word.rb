class Word < ActiveRecord::Base
  has_many :rhymelations
  has_many :word_rhymes, through: :rhymelations
  has_many :inverse_rhymelations, class_name: 'Rhymelation', foreign_key: "word_rhyme_id"
  has_many :inverse_word_rhymes, through: :inverse_rhymelations, source: :word

  has_many :synonym_relations
  has_many :word_synonyms, through: :synonym_relations
  has_many :inverse_synonym_relations, class_name: 'SynonymRelation', foreign_key: "word_synonym_id"
  has_many :inverse_word_synonyms, through: :inverse_synonym_relations, source: :word

  def rhymes
    searched_rhymes? ? all_rhymes : fetch_rhymes
  end

  def all_rhymes
    word_rhymes + inverse_word_rhymes
  end

  def synonyms
    searched_syns? ? all_synonyms : fetch_synonyms
  end

  def all_synonyms
    word_synonyms + inverse_word_synonyms
  end

private
  def fetch_synonyms
    response = Thesaurus.fetch_data(spelling)
    if response
      update!(searched_syns: true)

      response.each do |d|
        w = Word.find_or_create_by(spelling: d.downcase)
        SynonymRelation.find_or_create_by(word_synonym_id: w.id, word_id: self.id)
      end

      Word.find(self.id).all_synonyms
    else
      ["Please contact support"]
    end
  end

  def fetch_rhymes
    results = Faraday.get "http://rhymebrain.com/talk?function=getRhymes&word=#{spelling}"
    if results.status == 200
      update!(searched_rhymes: true)
      data = JSON.parse(results.body)

      data.uniq.each do |d|
        w = Word.find_or_create_by(spelling: d['word'].downcase)
        Rhymelation.find_or_create_by(word_rhyme_id: w.id, word_id: self.id)
      end

      Word.find(self.id).all_rhymes
    else
      ["Please contact support"]
    end
  end
end
