class RhymesController < ApplicationController


  def new
    @rhyme = Rhyme.new
  end

  def create

  end

  def index
    @rhymes = Rhyme.public_rhymes
  end
end