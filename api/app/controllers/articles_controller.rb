# frozen_string_literal: true

class ArticlesController < ApplicationController
  skip_before_action :authorize!, only: %i[index show]

  def index
    options = { meta: pagination_meta, links: pagination_links, include: included }
    return unless stale?(last_modified: paginated[:records].map(&:updated_at).max, public: true)

    render json: serializer.new(paginated[:records], options)
  end

  def show
    article =
      Article.find_by(slug: params[:id]) ||
      Article.find(params[:id])

    return unless stale?(last_modified: article.updated_at)

    render json: serializer.new(article, include: included)
  end

  def create
    article = current_user.articles.build(article_params)
    article.save!
    head :created
  end

  def update
    article = current_user.articles.find(params[:id])
    article.update!(article_params.except(:id))
    head :no_content
  end

  def destroy
    article = current_user.articles.find(params[:id])
    article.destroy
    head :no_content
  end

  private

  def article_params
    permitted = (params.require(:data).require(:attributes).
      permit(:title, :content, :slug) || ActionController::Parameters.new).to_h

    permitted[:id] = params[:data][:id]
    permitted
  end

  def serializer
    ArticleSerializer
  end

  def relation
    Article.recent
  end

  def included
    %w[user]
  end
end
