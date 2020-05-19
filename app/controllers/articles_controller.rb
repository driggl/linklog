# frozen_string_literal: true

class ArticlesController < ApplicationController
  skip_before_action :authorize!, only: %i[index show]

  def index
    options = { meta: pagination_meta, links: pagination_links }
    render json: serializer.new(paginated[:records], options)
  end

  def show
    article = Article.find(params[:id])
    render json: serializer.new(article)
  end

  def create
    article = current_user.articles.build(article_params)
    article.save!
    head :created
  end

  def update
    article = current_user.articles.find(params[:id])
    article.update!(article_params)
    head :no_content
  end

  def destroy
    article = current_user.articles.find(params[:id])
    article.destroy
    head :no_content
  end

  private

  def article_params
    params.require(:data).require(:attributes).
      permit(:title, :content, :slug) || ActionController::Parameters.new
  end

  def serializer
    ArticleSerializer
  end

  def relation
    Article.recent
  end
end
