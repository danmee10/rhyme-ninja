source 'https://rubygems.org'

# default
gem 'rails', '4.2.1'
gem 'pg'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc

# assets
gem 'twitter-bootstrap-rails'
gem 'angularjs-rails'
gem 'angular-rails-templates'
source 'https://rails-assets.org' do
  gem 'rails-assets-angular-ui-router'
  gem 'rails-assets-lodash'
  gem 'rails-assets-angular-cookies'
end

# Oauth
gem 'figaro'
gem 'omniauth'
gem 'omniauth-twitter'
gem 'omniauth-identity'
gem 'omniauth-google-oauth2'
gem 'omniauth-instagram'
gem 'omniauth-facebook'

# misc
gem 'awesome_print'
gem 'responders'
gem 'faraday', "~> 0.8.9"
group :production do
  gem 'rails_log_stdout',           github: 'heroku/rails_log_stdout'
  gem 'rails3_serve_static_assets', github: 'heroku/rails3_serve_static_assets'
end


group :development, :test do
  gem 'jasmine'
  gem 'vcr'
  gem 'byebug'
  gem 'web-console', '~> 2.0'
  gem 'spring', '~> 1.3.4'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'pry'
  gem 'rspec-rails', '~> 3.0'
  gem 'factory_girl_rails'
  gem 'capybara'
  gem 'database_cleaner'
  gem 'simplecov', :require => false, :group => :test
end

