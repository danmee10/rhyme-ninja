class Api::WordsController < Api::BaseController

  def rhymes
    word = Word.find_or_create_by(spelling: params[:word].downcase)
    @word_rhymes = word.rhymes
    respond_with(@word_rhymes)
  end

  def synonyms
    word = Word.find_or_create_by(spelling: params[:word].downcase)
    @word_synonyms = word.synonyms
    respond_with(@word_synonyms)
  end
end