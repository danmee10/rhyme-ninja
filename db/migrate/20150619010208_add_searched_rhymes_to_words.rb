class AddSearchedRhymesToWords < ActiveRecord::Migration
  def change
    add_column :words, :searched_rhymes, :boolean, default: false
    add_column :words, :searched_syns, :boolean, default: false
  end
end
