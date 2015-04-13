class UsersController < ApplicationController
  before_action :authenticate_user, only: [:show, :rhymes]

  def new
  end

  def show
  end

  def rhymes
    @rhymes = User.find(params[:user_id]).rhymes.to_a
  end
end