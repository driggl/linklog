# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TokensController, type: :controller do
  describe 'POST #create' do
    let(:params) do
      {
        data: {
          attributes: { login: 'jsmith', password: 'secret' }
        }
      }
    end

    context 'when no auth_data provided' do
      subject { post :create }
      it_behaves_like 'unauthorized_standard_requests'
    end

    context 'when invalid login provided' do
      let(:user) { create :user, login: 'invalid', password: 'secret' }
      subject { post :create, params: params }

      before { user }

      it_behaves_like 'unauthorized_standard_requests'
    end

    context 'when invalid password provided' do
      let(:user) { create :user, login: 'jsmith', password: 'invalid' }
      subject { post :create, params: params }

      before { user }

      it_behaves_like 'unauthorized_standard_requests'
    end

    context 'when valid data provided' do
      let(:user) { create :user, login: 'jsmith', password: 'secret' }
      subject { post :create, params: params }

      before { user }

      it 'should return 200 status code' do
        subject
        expect(response).to have_http_status(:ok)
      end

      it 'should return token in the header' do
        subject
        expect(response.headers['Authorization']).to eq("Bearer #{user.access_token.token}")
      end
    end

    context 'when invalid code provided' do
      let(:github_error) do
        double('Sawyer::Resource', error: 'bad_verification_code')
      end

      before do
        allow_any_instance_of(Octokit::Client).
          to receive(:exchange_code_for_token).and_return(github_error)
      end

      subject { post :create, params: { code: 'invalid_code' } }

      it_behaves_like 'unauthorized_oauth_requests'
    end

    context 'when success request' do
      let(:user_data) do
        {
          login: 'jsmith1',
          url: 'http://example.com',
          avatar_url: 'http://example.com/avatar',
          name: 'John Smith'
        }
      end

      let(:access_token) { { access_token: 'validaccesstoken', type: 'Bearer' } }

      before do
        allow_any_instance_of(Octokit::Client).
          to receive(:exchange_code_for_token).and_return(access_token)

        allow_any_instance_of(Octokit::Client).
          to receive(:user).and_return(user_data)
      end

      subject { post :create, params: { code: 'valid_code' } }

      it 'should return 200 status code' do
        subject
        expect(response).to have_http_status(:ok)
      end

      it 'should return token in the header' do
        expect { subject }.to(change { User.count }.by(1))
        user = User.find_by(login: 'jsmith1')
        expect(response.headers['Authorization']).to eq("Bearer #{user.access_token.token}")
      end
    end
  end

  describe 'DELETE #destroy' do
    subject { delete :destroy }

    context 'when no authorization header provided' do
      it_behaves_like 'forbidden_requests'
    end

    context 'when invalid authorization header provided' do
      before { request.headers['authorization'] = 'Invalid token' }

      it_behaves_like 'forbidden_requests'
    end

    context 'when valid request' do
      let(:user) { create :user }
      let(:access_token) { user.create_access_token }

      before { request.headers['authorization'] = "Bearer #{access_token.token}" }

      it 'should return 204 status code' do
        subject
        expect(response).to have_http_status(:no_content)
      end

      it 'should remove the proper access token' do
        expect { subject }.to(change { AccessToken.count }.by(-1))
      end
    end
  end
end
