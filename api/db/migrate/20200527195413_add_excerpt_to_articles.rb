class AddExcerptToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :excerpt, :text
  end
end
