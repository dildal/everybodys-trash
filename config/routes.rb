Rails.application.routes.draw do
  resources :posts, only: [:index, :create, :show, :update]
  resources :users, only: [:create]
  resources :trashes, only: [:index, :create, :destroy]
  
  post "/login", to: "sessions#create"
  get "/auth", to: "users#show"
  delete "/logout", to: "sessions#destroy"

  
end
