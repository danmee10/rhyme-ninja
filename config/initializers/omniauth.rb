Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, ENV['twitter_key'], ENV['twitter_secret'],
  {
    authorize_params: {
      force_login: 'true'
    }
  }
  provider :google_oauth2, ENV["GOOGLE_CLIENT_ID"], ENV["GOOGLE_CLIENT_SECRET"],
  {
    prompt: 'consent'
  }
  provider :instagram, ENV['INSTAGRAM_ID'], ENV['INSTAGRAM_SECRET']
  provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET'], auth_type: 'reauthenticate'
  provider :identity, on_failed_registration: lambda { |env|
    SessionsController.action(:new).call(env)
  }
end

OmniAuth.config.logger = Rails.logger