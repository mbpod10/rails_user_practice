# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create([
    {email: "mbpod10@gmail.com", password: "101010", password_confirmation: "101010" },
    {email: "z", password: "101010", password_confirmation: "101010" }
])





Information.create([
    {name: "Brock Podgurski", citizen:true, age: 25, 
    marital_status: "single", address: "no", dependent: false, 
    user_id: 1 }
])

puts "Seed Created"