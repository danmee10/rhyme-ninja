require 'rails_helper'

describe User do
  describe 'Associations' do
    it 'has_many Rhymes' do
      user = create(:user_with_rhymes)
      expect(user.rhymes.first.class).to be Rhyme
    end

    it 'has_many Authorizarions' do
      user = create(:user_with_authorizations)
      expect(user.authorizations.first.class).to be Authorization
    end
  end

  describe "Class Methods" do
    describe ".create_from_hash!" do
      it 'expects a hash with a name key nested within an info key' do
        hash = {'info' => {'name' => "Fake Name"}}
        user = User.create_from_hash!(hash)

        expect(user).to be_valid
      end
    end
  end

  describe "Instance Methods" do
    describe "#unauthorized_provider_names" do
      it "returns an array of names for every provider the user has no Authorization for" do
        user = create(:user)
        authorization = create(:authorization, provider: 'twitter', user: user)

        expect(user.unauthorized_provider_names).to eq(["google_oauth2", "facebook", "instagram"])
      end
    end
  end

end