Rails.application.routes.draw do
  root to: "rhymes#new"

  get '/auth/:provider/callback', :to => 'sessions#create'

  get 'sign_out', to: "sessions#destroy"
  get 'sign_in', to: "sessions#new"
  get 'sign_up', to: "user#new"

  resource :rhyme
  resource :user
end
