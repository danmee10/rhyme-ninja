class AddUserIdToRhymes < ActiveRecord::Migration
  def change
    add_reference :rhymes, :user, index: true
  end
end
