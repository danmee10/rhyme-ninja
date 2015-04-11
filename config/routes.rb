Rails.application.routes.draw do
  root to: "angular#front_end"

  match '/auth/:provider/callback', :to => 'sessions#create', via: [:get, :post]

  get 'sign_out', to: "sessions#destroy"
  get 'create_account', to: "sessions#new"

  resources :users do
    resources :rhymes
  end
  get '/rhymes', to: "rhymes#public_index"
end
