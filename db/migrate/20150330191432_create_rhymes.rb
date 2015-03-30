class CreateRhymes < ActiveRecord::Migration
  def change
    create_table :rhymes do |t|
      t.string :title
      t.text :original_text
      t.text :rhymed_text
      t.string :type

      t.timestamps null: false
    end
  end
end
