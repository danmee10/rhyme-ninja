module ApplicationHelper

  def site_navigation
    if signed_in?
      render partial: 'layouts/navigations/authenticated_nav'
    else
      render partial: 'layouts/navigations/unauthenticated_nav'
    end
  end
end
