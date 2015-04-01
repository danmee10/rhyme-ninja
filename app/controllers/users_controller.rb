class UsersController < ApplicationController
  before_action :authenticate_user, only: :show

  def new
  end

  def show
  end
end