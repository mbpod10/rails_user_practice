Rails.application.routes.draw do
  resources :information
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  root to: "static#home"
  resources :users, only: [:index, :show]
end


# curl --header "Content-Type: application/json" \
# --request POST \
# --data '{"user": {"email": "hack@gmail.com", "password": "101010"}}' \
# http://localhost:3000/sessions

# curl --header "Content-Type: application/json" --request POST --data '{"user": {"email": "hack@gmail.com", "password": "101010"}}' http://localhost:3000/sessions