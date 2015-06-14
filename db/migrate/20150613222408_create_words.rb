class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.string :spelling, uniqueness: true, required: true

      t.timestamps null: false
    end
  end
end
