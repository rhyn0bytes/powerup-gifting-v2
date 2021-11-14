Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'tests', to: 'tests#index'
      resources :wishes
      get '/all/wishes', to: 'wishes#all_wishes'
    end
  end
  get '/api/current_user', to: 'current_user#index'
  devise_for :users, path: 'api', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup',
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
  }

  get '*path', to: 'application#frontend_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
