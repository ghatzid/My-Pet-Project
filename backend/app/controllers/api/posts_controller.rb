class Api::PostsController < ApplicationController
  def index
    posts = Post.all

    paginate json: posts
  end
  
  def show
    post = Post.find(params[:id])

    render json: post
  end 

  def destroy
    post = Post.find(params[:id])
    post.delete
    render json: post
  end
  
  def create
 
    post = Post.create(name: params[:name], image: params[:image], likes: params[:likes])
 
   render json: post 
  end
  
  def update
      post = Post.find(params[:id])
      post.update(name: params[:name], image: params[:image], likes: params[:likes])

    render json: post
  end
end
