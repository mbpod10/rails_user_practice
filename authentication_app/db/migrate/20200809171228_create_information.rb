class CreateInformation < ActiveRecord::Migration[6.0]
  def change
    create_table :information do |t|
      t.string :name
      t.boolean :citizen 
      t.integer :age
      t.string :marital_status
      t.string :address
      t.boolean :dependent

      t.timestamps
    end
  end
end
