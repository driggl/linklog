class CreateAccessTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :access_tokens, id: :uuid do |t|
      t.string :token
      t.references :user, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end
  end
end
