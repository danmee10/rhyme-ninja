require 'rails_helper'

describe 'SynonymRelation' do

  describe 'Associations' do
    before(:each) do
      @w = create(:word, spelling: '1')
      @w2 = create(:word, spelling: '2')
      @sr = create(:synonym_relation, word: @w, word_synonym: @w2)
    end

    it "belongs to a word" do
      expect(@sr.word).to eq(@w)
    end

    it "belongs to a word_synonym" do
      expect(@sr.word_synonym).to eq(@w2)
    end

  end

end