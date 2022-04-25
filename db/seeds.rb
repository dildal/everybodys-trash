# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

trashes = Trash.create([{longitude: -75.160834,latitude: 39.931790, picture: "https://unsplash.com/photos/tlKTvMlu_fA", category: "furniture", title: "Modern Chair", isHeavy: false, description: "Chair on broad and south in pretty good condition."}, 
    {longitude: -75.173533,latitude: 39.930460, picture: "https://unsplash.com/photos/fZuleEfeA1Q", category: "furinture", title: "Green couch", isHeavy: true, description: "Green couch in good condition. Pretty big probably need a truck"},
    {longitude: -75.162089,latitude: 39.951058, picture: "https://unsplash.com/photos/0ClfreiNppM", category: "misc", title: "Bicycle", isHeavy: false, description: "Bike in really good condition.  Needs new front tire."},
    {longitude: -75.127340,latitude: 39.971325, picture: "https://thumbs.dreamstime.com/b/pile-old-clothes-shoes-dumped-underground-dumpster-cans-as-junk-garbage-littering-polluting-urban-city-street-143693667.jpg", category: "clothing", title: "Bunch of clothes", isHeavy: false, description: "Shirts, pants, and sweaters various states of disrepair"},
    {longitude: -75.200030,latitude: 39.955566, picture: "https://unsplash.com/photos/VDPauwJ_sHo", category: "electronics", title: "Copper Desk Lamp", isHeavy: false, description: "Copper desk lamp. Works!"}    
])

