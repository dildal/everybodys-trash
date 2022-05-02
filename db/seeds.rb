# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Trash.create([{longitude: -75.160834,latitude: 39.931790, picture: "https://unsplash.com/photos/tlKTvMlu_fA", category: "furniture", title: "Modern Chair", isHeavy: false, description: "Chair on broad and south in pretty good condition."}, 
    {longitude: -75.173533,latitude: 39.930460, picture: "https://unsplash.com/photos/fZuleEfeA1Q", category: "furinture", title: "Green couch", isHeavy: true, description: "Green couch in good condition. Pretty big probably need a truck"},
    {longitude: -75.162089,latitude: 39.951058, picture: "https://unsplash.com/photos/0ClfreiNppM", category: "misc", title: "Bicycle", isHeavy: false, description: "Bike in really good condition.  Needs new front tire."},
    {longitude: -75.127340,latitude: 39.971325, picture: "https://thumbs.dreamstime.com/b/pile-old-clothes-shoes-dumped-underground-dumpster-cans-as-junk-garbage-littering-polluting-urban-city-street-143693667.jpg", category: "clothing", title: "Bunch of clothes", isHeavy: false, description: "Shirts, pants, and sweaters various states of disrepair"},
    {longitude: -75.200030,latitude: 39.955566, picture: "https://unsplash.com/photos/VDPauwJ_sHo", category: "electronics", title: "Copper Desk Lamp", isHeavy: false, description: "Copper desk lamp. Works!"}    
])

user = User.create({username: 'donny', password: 'donny', password_confirmation: 'donny', first_name: 'Donny', last_name: "Normal", city: 'philadelphia'})
user2 = User.create({username: 'user', password: 'password', password_confirmation: 'password', first_name: 'User', last_name: 'Name', city: 'philadelphia'})

post1 = Post.create({title: "I need jars", body: "Hey y'all I'm getting married tomorrow and i need mason jars to hold the flowers on ppl's tables. I only need like 500", user: user, is_request: true})
Post.create({title: "I need flowers", body: "Hey y'all I'm getting married tomorrow and i need flowers to put into the mason jars on ppl's tables. I only need like 10,000", user: user, is_request: true})
Post.create({title: "I have a ton of jars", body: "Hey y'all I called off my wedding and now I have all these mason jars sitting around.  If anyone wants them they're all yours.", user: user, is_request: false})
Post.create({title: 'Hunting for Z\'s', body: 'Looking for some z\'s anybody have some they can spare?', user: user2, is_request: true})

Comment.create({body: 'I have 2 jars you can have.  Good luck with the other 498', user: user2, post: post1})