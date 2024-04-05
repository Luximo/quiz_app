Rails.application.routes.draw do
  resources :quizzes
  get "up" => "rails/health#show", as: :rails_health_check
end