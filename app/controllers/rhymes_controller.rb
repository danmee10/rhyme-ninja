class RhymesController < ApplicationController
  respond_to :json
  before_action :authenticate_user, except: [:public_index, :public_show]

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
    @rhyme = Rhyme.where(id: params[:rhyme][:id], user_id: params[:user_id]).first
    if !@rhyme.blank?
      @rhyme.update!(rhymed_text: params[:rhymed_text],
                      visibility: params[:visibility],
                syllable_pattern: params[:syllable_pattern],
                           title: params[:title])
      render json: @rhyme
    else
      render nothing: true
    end
  end

  def destroy
    rhyme = Rhyme.find(params[:id])
    if rhyme.present?
      rhyme.destroy!
      render json: nil, status: :ok
    else
      render json: nil, status: :error
    end
  end

  def public_index
    @rhymes = Rhyme.public_rhymes
    render 'rhymes/index.json'
  end

  def public_show
    @rhyme = Rhyme.public_rhymes.find(params[:id])
    if @rhyme.present?
      render 'rhymes/show.json'
    else
      flash[:error] = "No public Rhyme found."
      redirect to: :root
    end
  end
end