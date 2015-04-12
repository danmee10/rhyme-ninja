class RhymesController < ApplicationController
  respond_to :json
  before_action :authenticate_user

  def new
    @rhyme = Rhyme.new
  end

  def create
    @rhyme = Rhyme.create!({ user_id: params[:user_id],
                       original_text: params[:original_text],
                         rhymed_text: params[:original_text]})
    render json: @rhyme
  end

  def update
    @rhyme = Rhyme.find(params[:rhyme][:id])
    @rhyme.update!(rhymed_text: params[:rhyme][:rhymed_text])
    render json: @rhyme
  end

  def index
    @rhymes = Rhyme.public_rhymes
  end
end