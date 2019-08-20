# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Post.create(

#   name:"The Big One",
#   image:"https://cdn2.thecatapi.com/images/blg.jpg",
#   likes: 65
# )
# Post.create(
#   name: "Mr. Biggles",
#   image: "https://cdn2.thecatapi.com/images/MTYzMDM2OQ.jpg",
#   likes: 20
# )
# Post.create(
#   name: "Some cutie",
#   image: "https://cdn2.thecatapi.com/images/e6v.jpg",
#   likes: 11
# )
# Post.create(
#   name: "Catface",
#   image: "https://cdn2.thecatapi.com/images/weHGBmpb0.jpg",
#   likes: 16
# )
# Post.create(
#   name: "Ooni",
#   image: "file:///users/flatironschool/dev/module_projects/module-three-project-062419/images/image1.jpeg",
#   likes: 20
# )

# Comment.create(
#   content: "testing testing okay",
#   post_id: 14
# )

1.times do
Post.create(
  name: "test",
  image: "https://thecatapi.com/v1/images?api_key=7484a4a4-4e74-42e4-ac05-62d8cb94406b",
  likes: 20
)
end