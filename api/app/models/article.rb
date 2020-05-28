# frozen_string_literal: true

class Article < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :content, presence: true
  validates :slug, presence: true, uniqueness: true

  has_many :comments, dependent: :destroy

  scope :recent, -> { order(created_at: :desc) }

  before_save :sync_excerpt

  def sync_excerpt
    return unless content_changed?

    self.excerpt = content.split("\n").first
  end
end
