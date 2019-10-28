## My Pet Project

An imageboard for cat lovers to post, like and comment on pictures of their cats!

## Motivation

Like many people on social media, I like cats and always enjoy liking/sharing cat photos..  One of the projects I was assigned at Flatiron was to create a web app using vanilla Javascript for the frontend.  My Pet Project is my stab at creating a cat themed imageboard in the vein of sites such as Imgur or Pintrest.  

## Frameworks
This app uses React and Rails API with a SqLite database on the back end. The API is seeded with random cat names using the [Faker](https://github.com/faker-ruby/faker) gem.  Cat images are initially seeded by calling [TheCatAPI](https://thecatapi.com/) and using [HTTP Party](https://github.com/jnunemaker/httparty) to interface with a RESTFUL service in Ruby.


## Installation

Fork/Clone this repo, then navigate to the repo directory titled 'backend' in your terminal and run the following commands:

``` bash
bundle install
rails db:setup
rails db:seed
```

## How to use

Navigate to the 'backend' directory and run:
``` bash
rails s
```
Then naviagate to the 'frontend' directory and open index.html in the web browser of your choice.