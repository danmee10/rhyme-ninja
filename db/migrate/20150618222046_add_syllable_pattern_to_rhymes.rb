class AddSyllablePatternToRhymes < ActiveRecord::Migration
  def change
    add_column :rhymes, :syllable_pattern, :string, default: "5"
  end
end
