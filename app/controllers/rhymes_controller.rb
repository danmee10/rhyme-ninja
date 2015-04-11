class RhymesController < ApplicationController
  respond_to :json
  before_action :authenticate_user

  def new
    @rhyme = Rhyme.new
  end

  def create
    @rhyme = Rhyme.create!({ user_id: params[:user_id],
                       original_text: params[:original_text]})
    render nothing: true, status: 200
  end

  def index
    @rhymes = Rhyme.public_rhymes
  end
end