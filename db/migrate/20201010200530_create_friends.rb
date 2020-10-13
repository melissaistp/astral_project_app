class CreateFriends < ActiveRecord::Migration[6.0]
  def change
    create_table :friends do |t|
      t.string :alias, null: false
      t.string :sign
      t.string :likeability
      t.string :experience, null: false
      t.text :message
      t.text :instruction
      t.string :image, default: 'assets/ghost.png'
      t.timestamps
    end
  end
end
