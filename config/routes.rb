Rails.application.routes.draw do
  Rails.application.routes.draw do
    root 'home#index'
    namespace :api do 
      namespace :v1 do 
        resources :match_records, only: %i[index create destroy]
        devise_for :users, defaults: { format: :json }, controllers: {
          passwords: 'api/v1/users/passwords',
          sessions: 'api/v1/users/sessions',
          registrations: 'api/v1/users/registrations'
        }
      end 
    end 
    match '*path', to: redirect('/'), via: :all
  end
  
end
