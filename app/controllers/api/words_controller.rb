class Api::WordsController < Api::BaseController

  def rhymes
    word = Word.find_or_create_by(spelling: params[:word].downcase)
    @word_rhymes = word.rhymes
    respond_with(@word_rhymes)
  end

  def synonyms
    Rails.logger.debug("danmee synonyms --> #{params.inspect}")
  end
end