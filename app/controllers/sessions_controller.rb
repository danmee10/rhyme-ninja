class SessionsController < ApplicationController

  def new
    @identity = env['omniauth.identity']
  end

  def create
    auth = env["omniauth.auth"]
    unless @auth = Authorization.find_from_hash(auth)
      @auth = Authorization.create_from_hash(auth, current_user)
    end
    self.current_user = @auth.user

    add_temp_rhyme if current_user.authorizations.count == 1 && temp_rhyme_present?
    redirect_to "/#/my-rhymes", notice: "Welcome, #{current_user.name}."
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, notice: "Signed out!"
  end

  private

  def add_temp_rhyme
    title = cookies[:anonRhymeTitle].empty? ? 'Untitled' : cookies[:anonRhymeTitle]
    Rhyme.create!(user: current_user,
           rhymed_text: cookies[:anonRhymedText],
         original_text: cookies[:anonOriginalText],
      syllable_pattern: cookies[:anonSyllables],
            visibility: 1,
                 title: title)
    cookies.delete(:anonRhymeTitle)
    cookies.delete(:anonOriginalText)
    cookies.delete(:anonRhymedText)
    cookies.delete(:anonSyllables)
  end

  def temp_rhyme_present?
    cookies[:anonRhymedText].present? && cookies[:anonOriginalText].present?
  end
end
