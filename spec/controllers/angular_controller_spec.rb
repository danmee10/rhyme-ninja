require 'rails_helper'

describe AngularController do

  describe "GET #front_end" do
    context "with authenticated user" do
      before do
        controller.current_user = create(:user)
        get :front_end
      end

      it { expect(assigns(:user)).to eq(controller.current_user) }
      it { is_expected.to respond_with :ok }
      it { is_expected.to respond_with_content_type :html }
      it { is_expected.to render_with_layout :application }
      it { is_expected.to render_template :front_end }
    end

    context "with no authenticated user" do
      it 'assignes nil to the @user variable' do
        get :front_end

        expect(assigns(:user)).to eq(nil)
      end
    end

  end
end