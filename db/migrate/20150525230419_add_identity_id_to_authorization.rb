class AddIdentityIdToAuthorization < ActiveRecord::Migration
  def change
    add_reference :authorizations, :identity, index: true, foriegn_key: true
  end
end
