class CreateSynonymRelationTable < ActiveRecord::Migration
  def change
    create_table :synonym_relations do |t|
      t.integer :word_id
      t.integer :word_synonym_id

      t.timestamps null: false
    end
  end
end
