# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'access tokens routes' do
  it 'should route to tokens create action' do
    expect(post('/login')).to route_to('tokens#create')
  end

  it 'should route to tokens destroy action' do
    expect(delete('/logout')).to route_to('tokens#destroy')
  end
end
