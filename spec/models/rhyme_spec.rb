require 'rails_helper'

describe Rhyme do
  describe 'Validations' do
    it 'has a valid factory' do
      expect(build(:rhyme)).to be_valid
    end

    it 'is invalid without original_text' do
      expect(build(:rhyme, original_text: nil)).to_not be_valid
    end
  end

  describe 'Scopes' do
    it 'returns all publicly visible rhymes when scoped with public_rhymes' do
      2.times.each { create(:rhyme, :public) }
      1.times.each { create(:rhyme, :private) }

      expect(Rhyme.all.count).to eq(3)
      expect(Rhyme.public_rhymes.count).to eq(2)
    end
  end

  describe 'Associations' do
    it 'belongs to a User' do
      user = create(:user)
      rhyme = create(:rhyme, user: user)

      expect(rhyme.user).to eq(user)
    end
  end

end