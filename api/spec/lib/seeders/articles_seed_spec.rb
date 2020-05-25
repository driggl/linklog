# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Seeders::ArticlesSeed do
  describe "#call" do
    subject { described_class.new }

    before { create :user }

    it 'creates 100 articles by default' do
      expect { subject.call }.to(change { Article.count }.by(100))
    end

    it 'allows to override the count of created articles' do
      expect { subject.call(count: 1) }.to(change { Article.count }.by(1))
    end
  end
end