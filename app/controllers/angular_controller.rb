class AngularController < ApplicationController

  def front_end
    @user = current_user
  end
end
