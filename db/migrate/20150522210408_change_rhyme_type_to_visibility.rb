class ChangeRhymeTypeToVisibility < ActiveRecord::Migration
  def change
    remove_column :rhymes, :type
    add_column :rhymes, :visibility, :integer, default: 0
  end
end
