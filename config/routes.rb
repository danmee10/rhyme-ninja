Rails.application.routes.draw do
  root to: "angular#front_end"

  match '/auth/:provider/callback', :to => 'sessions#create', via: [:get, :post]
  match '/auth/failure', to: redirect('/'), via: :get

  get 'sign_out', to: "sessions#destroy"
  get 'create_account', to: "sessions#new"

  get 'public_rhymes', to: "rhymes#public_index"
  get 'public_rhyme_show/:id', to: "rhymes#public_show"
  resources :users do
    resources :rhymes, except: [:index, :edit]
    get '/rhymes', to: "users#rhymes"
  end

  namespace :api do
    get 'rhymes/:word', to: 'words#rhymes'
    get 'synonyms/:word', to: 'words#synonyms'
  end

end
