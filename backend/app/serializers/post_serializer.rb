class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :likes, :comments
end
