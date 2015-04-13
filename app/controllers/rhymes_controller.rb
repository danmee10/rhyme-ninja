class RhymesController < ApplicationController
  respond_to :json
  before_action :authenticate_user

  def new
    @rhyme = Rhyme.new
  end

  def show
    @rhyme = Rhyme.find(params[:id])
  end

  def create
    title = params[:title].empty? ? 'Untitled' : params[:title]
    @rhyme = Rhyme.create!({ user_id: params[:user_id],
                       original_text: params[:original_text],
                         rhymed_text: params[:original_text],
                               title: title})
    render json: @rhyme
  end

  def update
    @rhyme = Rhyme.find(params[:rhyme][:id])
    @rhyme.update!(rhymed_text: params[:rhymed_text])
    render json: @rhyme
  end

  def index
    @rhymes = Rhyme.public_rhymes
  end
end