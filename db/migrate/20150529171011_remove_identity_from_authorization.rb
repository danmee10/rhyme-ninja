class RemoveIdentityFromAuthorization < ActiveRecord::Migration
  def change
    remove_reference :authorizations, :identity, index: true, foriegn_key: true
  end
end
