# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserAuthenticator do
  let(:user) { create :user, login: 'jsmith', password: 'secret' }

  shared_examples_for 'authenticator' do
    it 'should create and set user access token' do
      expect(authenticator.adapter).to receive(:call).and_return(true)
      expect(authenticator.adapter).to receive(:user).
        at_least(:once).and_return(user)
      authenticator.call
      expect(authenticator.access_token).to be_present
    end
  end

  context 'when initialized with code' do
    let(:authenticator) { described_class.new(code: 'sample') }
    let(:authenticator_class) { AuthAdapters::Github }

    describe '#initialize' do
      it 'should initialize proper authenticator' do
        expect(authenticator_class).to receive(:new).with('sample')
        authenticator
      end
    end

    it_behaves_like 'authenticator'
  end

  context 'when initialized with login & password' do
    let(:authenticator) { described_class.new(login: 'jsmith', password: 'secret') }
    let(:authenticator_class) { AuthAdapters::Standard }

    describe '#initialize' do
      it 'should initialize proper authenticator' do
        expect(authenticator_class).to receive(:new).with('jsmith', 'secret')
        authenticator
      end
    end

    it_behaves_like 'authenticator'
  end
end
