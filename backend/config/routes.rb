Rails.application.routes.draw do

  namespace :api do
   resources :comments
   resources :posts
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
