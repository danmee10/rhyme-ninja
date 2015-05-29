require 'rails_helper'

describe Identity do
  describe 'Validations' do
    it 'has a valid factory' do
      expect(build(:identity)).to be_valid
    end
    it 'is invalid without a name' do
      expect(build(:identity, name: nil)).to_not be_valid
    end
    it 'is invalid without a email' do
      expect(build(:identity, email: nil)).to_not be_valid
    end
    it 'validates uniqueness of email' do
      create(:identity, email: "this@isa.test")

      expect(build(:identity, email: "this@isa.test")).to_not be_valid
      expect(build(:identity, email: "this@isa.newtest")).to be_valid
    end
    it 'validates the format of an email' do
      expect(build(:identity, email: "something@host.domain")).to be_valid
      expect(build(:identity, email: "@.com")).to_not be_valid
      expect(build(:identity, email: "stuff")).to_not be_valid
      expect(build(:identity, email: "stuff@things")).to_not be_valid
      expect(build(:identity, email: "stuff.things@com")).to_not be_valid
      expect(build(:identity, email: "stuff.com")).to_not be_valid
    end
  end
end