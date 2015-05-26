require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html, :json

  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end

  def signed_in?
    current_user.present? && !current_user.anon?
  end

  helper_method :current_user, :signed_in?

  def current_user=(user)
    @current_user = user
    session[:user_id] = user.id
  end

  def authenticate_user
    param_id = params['user_id'] || params[:id]
    if current_user.id.to_s != param_id
      respond_to do |format|
        format.html {
          flash[:error] = "You are not authorized to view that page."
          redirect_to :root
        }
        format.json { raise 'UnauthorizedError' }
      end
    end
  end

end
