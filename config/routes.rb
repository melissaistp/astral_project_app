Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'friends/index'
      post 'friends/create'
      get '/show/:id', to: 'friends#show'
      delete '/destroy/:id', to: 'friends#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end