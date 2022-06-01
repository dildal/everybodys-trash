Rails.application.routes.draw do
  namespace :api do
    resources :wishes, only: [:index, :create]
    resources :tags, only: [:create]
    resources :messages, only: [:index, :create, :update] do
      collection do
        get 'unread'
      end
    end

    resources :comments, only: [:create, :update, :destroy]
    resources :posts
    resources :users, only: [:create]
    resources :trashes, only: [:index, :create, :destroy]
    
    post "/login", to: "sessions#create"
    get "/auth", to: "users#show"
    delete "/logout", to: "sessions#destroy"
    get '/receiver/:id', to: "users#get_receiver"
  end

  mount ActionCable.server => '/cable'

  # Routing logic: fallback requests for React Router.
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  
end
