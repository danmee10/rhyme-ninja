require 'rails_helper'

describe 'Rhymelation' do

  describe 'Associations' do
    before(:each) do
      @w = create(:word, spelling: '1')
      @w2 = create(:word, spelling: '2')
      @r = create(:rhymelation, word: @w, word_rhyme: @w2)
    end

    it "belongs to a word" do
      expect(@r.word).to eq(@w)
    end

    it "belongs to a word_rhyme" do
      expect(@r.word_rhyme).to eq(@w2)
    end

  end

end