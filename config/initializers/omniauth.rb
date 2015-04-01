Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, ENV['twitter_key'], ENV['twitter_secret']
  provider :identity, on_failed_registration: lambda { |env|
    SessionsController.action(:new).call(env)
  }
end