class CreateWordRhymes < ActiveRecord::Migration
  def change
    create_table :rhymelations do |t|
      t.integer :word_id
      t.integer :word_rhyme_id

      t.timestamps null: false
    end
  end
end
