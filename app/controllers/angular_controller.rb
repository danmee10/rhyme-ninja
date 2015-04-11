class AngularController < ApplicationController
  before_action :create_anon_if_no_current

  def front_end
    @user = current_user
  end
end