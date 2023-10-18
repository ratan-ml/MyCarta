@cart_items.each do |cart_item|
    json.set! cart_item.id do
        json.extract! cart_item, :id, :product_id, :quantity # :user_id, 
        json.product cart_item.product, :id, :name, :price
        json.photoUrl cart_item.product.photo.url
    end
end
