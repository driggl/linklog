# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post 'login', to: 'tokens#create'
  delete 'logout', to: 'tokens#destroy'

  post 'sign_up', to: 'registrations#create'

  resources :articles
end
