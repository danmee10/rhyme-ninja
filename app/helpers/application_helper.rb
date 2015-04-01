module ApplicationHelper

  def site_navigation
    session_type = signed_in? ? 'authenticated' : 'unauthenticated'
    render partial: "layouts/navigations/base_nav", locals: {session_type: session_type}
  end

  def body_id
    params["controller"].parameterize + "-#{params['action']}" if params["controller"].present?
  end
end
