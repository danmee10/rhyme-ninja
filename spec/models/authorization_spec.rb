require 'rails_helper'

describe Authorization do
  describe 'Associations' do
    it 'belongs_to User' do
      user = create(:user)
      authorization = create(:authorization, user: user)

      expect(authorization.user).to eq(user)
    end

    it 'belongs_to Identity' do
      identity = create(:identity)
      authorization = create(:authorization, identity: identity)

      expect(authorization.identity).to eq(identity)
    end
  end

  describe "Validations" do
    it 'has a valid factory' do
      expect(build(:authorization)).to be_valid
    end
    it 'is invalid without a user_id' do
      expect(build(:authorization, user_id: nil)).to_not be_valid
    end
    it 'is invalid without a uid' do
      expect(build(:authorization, uid: nil)).to_not be_valid
    end
    it 'is invalid without a provider' do
      expect(build(:authorization, provider: nil)).to_not be_valid
    end
    it 'is invalid without a uid uniq to its provider' do
      create(:authorization, provider: 'twitter', uid: "test")
      create(:authorization, provider: 'facebook', uid: "test2")

      expect(build(:authorization, provider: 'twitter', uid: 'test')).to_not be_valid
      expect(build(:authorization, provider: 'twitter', uid: 'test2')).to be_valid
    end
  end

  describe "Constants" do
    describe 'PROVIDERS' do
      it "contains all provider names and their auth_url's" do
        expect(Authorization::PROVIDERS['twitter']['auth_url']).to eq("/auth/twitter")
        expect(Authorization::PROVIDERS['google_oauth2']['auth_url']).to eq("/auth/google_oauth2")
        expect(Authorization::PROVIDERS['facebook']['auth_url']).to eq("/auth/facebook")
        expect(Authorization::PROVIDERS['instagram']['auth_url']).to eq("/auth/instagram")
      end
    end
  end

  describe "Class Methods" do
    describe ".find_from_hash" do
      it 'locates an authorization record from a hash with provider and uid keys' do
        hash = {"provider" => 'twitter', "uid" => 'fakeUID'}
        auth = create(:authorization, provider: 'twitter', uid: 'fakeUID')

        expect(Authorization.find_from_hash(hash)).to eq(auth)
      end
    end

    describe ".create_from_hash" do
      let(:hash) {{'uid' => 'uidstring', 'provider' => 'twitter', 'info' => { 'name' => 'User Name'}}}

      it "creates an Authorization record from a hash with uid and provider keys" do
        expect(Authorization.create_from_hash(hash)).to be_valid
      end

      it "optionally accepts a user" do
        user = create(:user)

        expect(Authorization.create_from_hash(hash, user)).to be_valid
      end

      it "converts that user record to standard if they are anon" do
        user = create(:user, group: 'anon')
        auth = Authorization.create_from_hash(hash, user)

        expect(auth).to be_valid
        expect(auth.user.group).to eq('standard')
      end

      it "creates associated identity object and applies that name to associated user model if provider = identity" do
        identity_hash = {
                          'uid' => 'uidstring',
                     'provider' => 'identity',
                         'info' => {
                            'name' =>'New User Name',
                            'email' => 'iden@email.com'
                          }
                        }

        user = create(:user, name: nil)
        create(:identity, email: 'iden@email.com')
        auth = Authorization.create_from_hash(identity_hash, user)

        expect(auth).to be_valid
        expect(auth.user.name).to eq('New User Name')
        expect(auth.identity).to_not be_nil
      end

    end
  end
end