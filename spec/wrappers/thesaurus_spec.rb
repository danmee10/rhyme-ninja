require 'rails_helper'

describe 'Thesaurus' do

  describe 'Class methods' do

    describe 'Thesaurus.fetch_data()' do
      context "data.status == 200" do
        it 'returns an array of related words' do
          VCR.use_cassette("remind_thesaurus") do

            results = Thesaurus.fetch_data('remind')

            expect(results).to eq(["prompt", "cue", "inform"])
          end
        end
      end

      context "data.status == 404" do
        it 'returns an empty array' do
          VCR.use_cassette("remaksdcjind_thesaurus") do

            results = Thesaurus.fetch_data('remaksdcjind')

            expect(results).to eq([])
          end
        end
      end

      context "data.status == 303" do
        it 'extracts the suggested word from the location header and remakes the call with that word' do
          VCR.use_cassette("reminding_remind_thesaurus") do

            results = Thesaurus.fetch_data('reminding')

            expect(results).to eq(["prompt", "cue", "inform"])
          end
        end
      end

      context "data.status == 500" do
        it 'returns false' do
          VCR.use_cassette("500_thesaurus") do

            ENV['THESAURUS_KEY'] = "nonsense"
            results = Thesaurus.fetch_data('reminding')

            expect(results).to eq(false)
          end
        end
      end

    end

  end

end