# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Seeders::UsersSeed do
  describe "#call" do
    subject { described_class.new }

    it 'creates 10 users by default' do
      expect { subject.call }.to(change { User.count }.by(10))
    end

    it 'allows to override the count of created users' do
      expect { subject.call(count: 1) }.to(change { User.count }.by(1))
    end
  end
end