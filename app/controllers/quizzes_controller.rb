class QuizzesController < ApplicationController
  def index
    @quizzes = Quiz.all.sample(10)
  end  

  def show
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end
end