require 'rails_helper'

describe Word do

  describe 'Associations' do

    describe 'Rhymelations' do

      before(:each) do
        @w = create(:word, spelling: '1')
        @w2 = create(:word, spelling: "2")
        @r = create(:rhymelation, word: @w, word_rhyme: @w2)
      end

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

    describe 'SynonymRelations' do

      before(:each) do
        @w = create(:word, spelling: '1')
        @w2 = create(:word, spelling: "2")
        @s = create(:synonym_relation, word: @w, word_synonym: @w2)
      end

      it 'has_many SynonymRelations' do
        expect(@w.synonym_relations.first).to eq(@s)
      end
      it 'has_many word_synonyms through SynonymRelations' do
        expect(@w.word_synonyms.first).to eq(@w2)
      end
      it 'has_many inverse_synonym_relations' do
        expect(@w.inverse_synonym_relations.first).to eq(@w2.synonym_relations.first)
      end
      it 'has_many inverse_word_synonyms' do
        expect(@w.inverse_word_synonyms.first).to eq(@w2.word_synonyms.first)
      end
    end
  end

  describe 'Instance Methods' do

    describe 'Word#rhymes' do
      context 'when word.searched_rhymes == true' do

        before(:each) do
          @w = create(:word, spelling: 'danmee', searched_rhymes: true)
          @w2 = create(:word, spelling: "2")
          @r = create(:rhymelation, word: @w, word_rhyme: @w2)
        end

        it 'returns an array containing all word_rhymes and inverse_word_rhymes' do
          w3 = create(:word, spelling: '3')
          r2 = create(:rhymelation, word: w3, word_rhyme: @w)

          expect(@w.word_rhymes).to eq([@w2])
          expect(@w.inverse_word_rhymes).to eq([w3])
          expect(@w.rhymes).to eq([@w2, w3])
        end
      end
      context 'when word.searched_rhymes == false' do
        it 'calls the fetch_rhymes method' do
          VCR.use_cassette("forget_rhymes") do
            w3 = create(:word, spelling: 'forget', searched_rhymes: false)

            expect(w3.rhymes[0..5].map(&:spelling)).to eq(["get", "threat", "regret", "cigarette", "sweat", "cassette"])
            expect(Word.count).to eq(501)
            expect(Rhymelation.count).to eq(500)
            expect(w3.word_rhymes.count).to eq(500)
            expect(w3.inverse_word_rhymes.count).to eq(0)
          end
        end
      end
    end

    describe 'Word#all_rhymes' do
      it "returns a word's word_rhymes and inverse_word_rhymes in a single array" do
          w = create(:word, spelling: 'danmee')
          w2 = create(:word, spelling: "2")
          w3 = create(:word, spelling: "3")
          r = create(:rhymelation, word: w, word_rhyme: w2)
          r2 = create(:rhymelation, word: w3, word_rhyme: w)

          combo = w.word_rhymes + w.inverse_word_rhymes
          expect(w.all_rhymes).to eq(combo)
      end
    end

    describe 'Word#synonyms' do
      context "searched_syns? == true" do

        before(:each) do
          @w = create(:word, spelling: 'danmee', searched_syns: true)
          @w2 = create(:word, spelling: "2")
          @sr = create(:synonym_relation, word: @w, word_synonym: @w2)
        end

        it 'returns an array containing all word_synonyms and inverse_word_synonyms' do
          w3 = create(:word, spelling: '3')
          sr2 = create(:synonym_relation, word: w3, word_synonym: @w)

          expect(@w.word_synonyms).to eq([@w2])
          expect(@w.inverse_word_synonyms).to eq([w3])
          expect(@w.synonyms).to eq([@w2, w3])
        end
      end

      context "searched_syns? == false" do
        it 'calls the fetch_synonyms method' do
          w3 = create(:word, spelling: 'forget', searched_syns: false)

          Thesaurus.stub(:fetch_data).and_return(['some', 'fake', 'synonyms'])
          expect(w3.synonyms[0..5].map(&:spelling)).to eq(["some", "fake", "synonyms"])
          expect(Word.count).to eq(4)
          expect(SynonymRelation.count).to eq(3)
          expect(w3.word_synonyms.count).to eq(3)
          expect(w3.inverse_word_synonyms.count).to eq(0)
        end
      end
    end

    describe 'Word#all_synonyms' do
      it "returns a word's word_synonyms and inverse_word_synonyms in a single array" do
          w = create(:word, spelling: 'danmee')
          w2 = create(:word, spelling: "2")
          w3 = create(:word, spelling: "3")
          sr = create(:synonym_relation, word: w, word_synonym: w2)
          sr2 = create(:synonym_relation, word: w3, word_synonym: w)

          combo = w.word_synonyms + w.inverse_word_synonyms
          expect(w.all_synonyms).to eq(combo)
      end
    end
  end
end