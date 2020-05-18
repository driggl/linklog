# frozen_string_literal: true

require 'rails_helper'

RSpec.shared_context 'json errors' do
  shared_examples_for 'unauthorized_standard_requests' do
    let(:authentication_error) do
      {
        'status' => '401',
        'source' => { 'pointer' => '/data/attributes/password' },
        'title' => 'Invalid login or password',
        'detail' => 'You must provide valid credentials in order to exchange them for token.'
      }
    end

    it 'should return 401 status code' do
      subject
      expect(response).to have_http_status(401)
    end

    it 'should return proper error body' do
      subject
      expect(json['errors']).to include(authentication_error)
    end
  end

  shared_examples_for 'unauthorized_oauth_requests' do
    let(:authentication_error) do
      {
        'status' => '401',
        'source' => { 'pointer' => '/code' },
        'title' => 'Authentication code is invalid',
        'detail' => 'You must provide valid code in order to exchange it for token.'
      }
    end

    it 'should return 401 status code' do
      subject
      expect(response).to have_http_status(401)
    end

    it 'should return proper error body' do
      subject
      expect(json['errors']).to include(authentication_error)
    end
  end

  shared_examples_for 'forbidden_requests' do
    let(:authorization_error) do
      {
        'status' => 403,
        'source' => { 'pointer' => '/request/headers/authorization' },
        'title' => 'Forbidden request',
        'detail' => 'You have no rights to access this resource'
      }
    end

    it 'should return 403 status code' do
      subject
      expect(response).to have_http_status(:forbidden)
    end

    it 'should return proper error json' do
      subject
      expect(json['errors']).to include(authorization_error)
    end
  end

  shared_examples_for 'not_found_requests' do
    let(:not_found_error) do
      {
        'status' => 404,
        'source' => { 'pointer' => '/request/url/:id' },
        'title' => 'Record not Found',
        'detail' => 'We could not find the object you were looking for.'
      }
    end

    it 'should return 404 status code' do
      subject
      expect(response).to have_http_status(:not_found)
    end

    it 'should return proper error json' do
      subject
      expect(json['errors']).to include(not_found_error)
    end
  end
end
