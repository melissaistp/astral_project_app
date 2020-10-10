class CreateFriends < ActiveRecord::Migration[6.0]
  def change
    create_table :friends do |t|
      t.string :alias, null: false
      t.string :sign
      t.string :likeability
      t.string :experience, null: false
      t.text :message
      t.text :instruction
      t.string :image, default: 'https://lh3.googleusercontent.com/proxy/5Sk5o6g27JxOm1UDnAStlvYAEb3KqxhfVm9KZKMr7NlyScEFSJfjtW8sgvvpJYt9roKsWagYafmP2czg56tvFKDUwokOVDuL3pIRGM8'
      t.timestamps
    end
  end
end
