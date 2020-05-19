# frozen_string_literal: true

require 'pagy'

module Pagination
  extend ActiveSupport::Concern
  include Pagy::Backend

  private

  def current_page
    return unless params[:page].is_a?(ActionController::Parameters)

    (params[:page][:number] || 1).to_i
  end

  def per_page
    return unless params[:page].is_a?(ActionController::Parameters)

    (params[:page][:size] || 10).to_i
  end

  def paginated
    return { pagy: @pagy, records: @paginated } if @paginated

    @pagy, @paginated = pagy(relation.all, items: per_page)
    { pagy: @pagy, records: @paginated }
  end

  def pagy_get_vars(collection, vars)
    vars[:count] ||= (c = collection.count(:all)).is_a?(Hash) ? c.size : c
    vars[:page]  ||= current_page
    vars
  end

  def total
    paginated[:pagy].count
  end

  def pagination_links
    PaginationMetaGenerator.new(
      request: request, total_pages: total_pages
    ).call
  end

  def pagination_meta
    { total_pages: total_pages, total: total }
  end

  def total_pages
    paginated[:pagy].pages
  end
end
