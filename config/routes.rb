Rails.application.routes.draw do
  resources :messages, only: [:show, :create]
  resources :comments, only: [:create, :update, :destroy]
  resources :posts
  resources :users, only: [:create]
  resources :trashes, only: [:index, :create, :destroy]
  
  post "/login", to: "sessions#create"
  get "/auth", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  get '/receiver/:id', to: "users#get_receiver"

  mount ActionCable.server => '/cable'

  
end
