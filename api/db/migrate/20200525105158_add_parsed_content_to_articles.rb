# frozen_string_literal: true

class AddParsedContentToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :parsed_content, :text
  end
end
