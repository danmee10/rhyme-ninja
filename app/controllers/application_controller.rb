class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end

  def signed_in?
    !!current_user
  end

  helper_method :current_user, :signed_in?

  def current_user=(user)
    @current_user = user
    session[:user_id] = user.id
  end

  def authenticate_user
    if current_user.blank? || current_user.id.to_s != params[:id]
      flash[:error] = "You are not authorized to view that page."
      redirect_to :root
    end
  end
end
