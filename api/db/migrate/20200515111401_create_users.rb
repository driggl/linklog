class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string :login
      t.string :name
      t.string :email
      t.string :url
      t.string :avatar_url
      t.string :provider
      t.jsonb :auth_data, null: false, default: {}
    end
  end
end
