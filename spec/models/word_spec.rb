require 'rails_helper'

describe Word do
  before(:each) do
    @w = create(:word, spelling: '1')
    @w2 = create(:word, spelling: "2")
    @r = create(:rhymelation, word: @w, word_rhyme: @w2)
  end

  describe 'Associations' do

    it 'has_many Rhymelations' do
      expect(@w.rhymelations.first).to eq(@r)
    end
    it 'has_many word_rhymes through Rhymelations' do
      expect(@w.word_rhymes.first).to eq(@w2)
    end
    it 'has_many inverse_rhymelations' do
      expect(@w.inverse_rhymelations.first).to eq(@w2.rhymelations.first)
    end
    it 'has_many inverse_word_rhymes' do
      expect(@w.inverse_word_rhymes.first).to eq(@w2.word_rhymes.first)
    end
  end

  describe 'Instance Methods' do
    describe 'Word#rhymes' do
      context 'when word has rhyming relationships' do
        it 'returns an array containing all word_rhymes and inverse_word_rhymes' do
          w3 = create(:word, spelling: '3')
          r2 = create(:rhymelation, word: w3, word_rhyme: @w)

          expect(@w.word_rhymes).to eq([@w2])
          expect(@w.inverse_word_rhymes).to eq([w3])
          expect(@w.rhymes).to eq([@w2, w3])
        end
      end
      context 'when word has no rhyming relationships' do
        xit 'makes a call to the RhymeBrain API...' do
        end
      end
    end
  end
end