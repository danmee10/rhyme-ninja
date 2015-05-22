class ChangeTypeColumn < ActiveRecord::Migration
  def change
    remove_column :rhymes, :type, :string
    add_column :rhymes, :visibility, :integer, default: 0
  end
end
