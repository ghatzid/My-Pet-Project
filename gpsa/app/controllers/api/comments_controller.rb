class Api::CommentsController < ApplicationController
  def index
    comments = Comment.all

    render json: comments
  end

  def show
    comment = Comment.find(params[:id])

    render json: comment
  end 

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy

    render json: comment
  end
  
  def create
 
    comment = Comment.create(content: params[:content], post_id: params[:post_id])
 
   render json: comment 
  end
  
  def update
      comment = Comment.find(params[:id])
      comment.update(content: params[:content], post_id: params[:post_id])

    render json: comment  
  end
end
