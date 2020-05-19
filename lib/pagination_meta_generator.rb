# frozen_string_literal: true

class PaginationMetaGenerator
  DEFAULT_PAGE = 1
  DEFAULT_PER_PAGE = 20

  def initialize(request:, total_pages:)
    @url = request.base_url + request.path
    @page = (request.params[:page].try(:[], :number).presence || DEFAULT_PAGE).to_i
    @per_page = (request.params[:page].try(:[], :size).presence || DEFAULT_PER_PAGE).to_i
    @total_pages = total_pages
  end

  def call
    links = {}
    add_previous_pages_links(links) if page > 1
    links[:self] = generate_url(page)
    add_next_pages_links(links) if page < total_pages
    links
  end

  private

  def add_previous_pages_links(links)
    links[:first] = generate_url(1)
    links[:prev] = generate_url(page - 1)
  end

  def add_next_pages_links(links)
    links[:next] = generate_url(page + 1)
    links[:last] = generate_url(total_pages)
  end

  attr_reader :per_page, :page, :total_pages
  attr_accessor :url

  def generate_url(page)
    [url, url_params(page).presence].compact.join('?')
  end

  def url_params(page)
    url_params = {}
    url_params[:page] = {} if include_per_page? || include_page?(page)
    url_params[:page][:size] = per_page if include_per_page?
    url_params[:page][:number] = page if include_page?(page)
    url_params.to_query
  end

  def include_per_page?
    (per_page != 0) && (per_page != DEFAULT_PER_PAGE)
  end

  def include_page?(page)
    (page > 1)
  end
end
