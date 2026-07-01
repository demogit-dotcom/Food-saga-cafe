"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

const dishes = [
  {
    id: 1,
    name: "KOKO",
    tagline: "Decadent Black Cocoa Creation",
    price: "₹ 297.60",
    description:
      "Our signature minimalist dessert featuring rich black cocoa cake presented on pristine white porcelain.",
    ingredients: ["Premium cocoa", "Organic flour", "Madagascar vanilla", "Sea salt"],
    image: "/images/tiramisu.jpg",
  },
  {
    id: 2,
    name: "PISTACHIO KUNAFA",
    tagline: "Middle Eastern Elegance",
    price: "₹ 420",
    description: "Traditional kunafa reimagined with premium pistachios and delicate phyllo pastry.",
    ingredients: ["Sicilian pistachios", "Phyllo pastry", "Rose water", "Organic honey"],
  },
  {
    id: 3,
    name: "STRAWBERRY CAKE",
    tagline: "Berry Indulgence",
    price: "₹ 450",
    description: "Soft homemade vanilla sponge layered with creme diplomat, fresh strawberry and chantilly garnish.",
    ingredients: ["Vanilla sponge", "Fresh strawberries", "Chantilly cream", "Diplomat cream"],
    image: "/images/strawberry-cake.jpg",
  },
  {
    id: 4,
    name: "TIRAMISU 2.0",
    tagline: "Italian Classic Refined",
    price: "₹ 370",
    description: "Traditional tiramisu elevated with single-origin espresso and mascarpone.",
    ingredients: ["Mascarpone", "Ladyfingers", "Espresso", "Cocoa powder"],
    image: "/images/tiramisu.jpg",
  },
  {
    id: 5,
    name: "LAZY CAT CAKE",
    tagline: "Chocolate Indulgence",
    price: "₹ 420",
    description: "Layers of chocolate sponge, cream, and crunchy chocolate nibs for texture contrast.",
    ingredients: ["Dark chocolate", "Chocolate sponge", "Fresh cream", "Cocoa nibs"],
    image: "/images/lazy-cat-cake.jpg",
  },
  {
    id: 6,
    name: "PROTEIN CAKE",
    tagline: "Healthy Indulgence",
    price: "₹ 260",
    description: "Egg-free, gluten-free, protein-rich, low-calorie dessert for the health-conscious.",
    ingredients: ["Plant protein", "Dark chocolate", "Natural sweeteners", "Gluten-free flour"],
    image: "/images/protein-cake.jpg",
  },
  {
    id: 7,
    name: "STRAWBERRY CROISSANT",
    tagline: "Buttery Perfection",
    price: "₹ 350",
    description: "Flaky croissant filled with strawberry cheesecake cream and fresh berries.",
    ingredients: ["Butter croissant", "Cream cheese", "Fresh strawberries", "Pistachios"],
    image: "/images/strawberry-croissant.jpg",
  },
  {
    id: 8,
    name: "AVOCADO GRANOLA BOWL",
    tagline: "Wholesome Indulgence",
    price: "₹ 450",
    description: "Fresh avocado paired with house-made granola and seasonal fruits.",
    ingredients: ["Hass avocado", "House granola", "Seasonal fruits", "Honey drizzle"],
    image: "/images/avocado-strawberry-granola.jpg",
  },
  {
    id: 9,
    name: "MATCHA DELICE",
    tagline: "Japanese Zen",
    price: "₹ 350",
    description: "Premium matcha mousse with subtle sweetness and earthy undertones.",
    ingredients: ["Ceremonial matcha", "White chocolate", "Fresh cream", "Yuzu zest"],
  },
]

export default function DishesPage() {
  const [selectedDish, setSelectedDish] = useState<(typeof dishes)[0] | null>(null)
  const [visibleDishes, setVisibleDishes] = useState(dishes)

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const category = hash.substring(1)
      if (category === "signature" || category === "cakes") {
        // Filter dishes based on category
        // This is a simple implementation - you might want to add actual categories to your dishes data
        setVisibleDishes(dishes)
      }
    }
  }, [])

  return (
    <div className="page-transition pt-16">
      {/* Hero Carousel */}
      <section className="relative h-96 bg-black">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="Signature dishes"
            fill
            className="object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-5xl md:text-6xl font-light tracking-wider text-white text-shadow">DISHES</h1>
        </div>
      </section>

      {/* Dish Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {visibleDishes.map((dish) => (
              <div key={dish.id} className="group cursor-pointer" onClick={() => setSelectedDish(dish)}>
                <div className="relative overflow-hidden border border-black mb-4">
                  <div className="w-full h-64 bg-gray-100">
                    {dish.image ? (
                      <Image
                        src={dish.image || "/placeholder.svg"}
                        alt={dish.name}
                        fill
                        className="object-cover grayscale group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <Image
                        src={`/placeholder.svg?height=300&width=300`}
                        alt={dish.name}
                        fill
                        className="object-cover grayscale group-hover:scale-105 transition-transform duration-200"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <h3 className="text-xl font-medium tracking-wider">{dish.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium tracking-wider text-black uppercase mb-1">{dish.name}</h3>
                  <p className="text-sm text-gray-600">{dish.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover More */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="/menu"
            className="inline-block bg-black text-white px-12 py-4 text-lg font-medium tracking-wider hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-300"
          >
            EXPLORE OUR FULL MENU
          </a>
        </div>
      </section>

      {/* Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-black" />
              </button>
              <div className="w-full h-64 relative">
                {selectedDish.image ? (
                  <Image
                    src={selectedDish.image || "/placeholder.svg"}
                    alt={selectedDish.name}
                    fill
                    className="w-full h-full object-cover grayscale"
                  />
                ) : (
                  <Image
                    src={`/placeholder.svg?height=400&width=600`}
                    alt={selectedDish.name}
                    fill
                    className="w-full h-full object-cover grayscale"
                  />
                )}
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-light tracking-wider text-black mb-2">{selectedDish.name}</h2>
              <p className="text-lg text-gray-600 mb-4">{selectedDish.tagline}</p>
              <p className="text-gray-800 leading-relaxed mb-6">{selectedDish.description}</p>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-black mb-3">INGREDIENTS</h3>
                <ul className="space-y-1">
                  {selectedDish.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">
                      • {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-2xl font-light text-black">{selectedDish.price}</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm tracking-wide">© 2026 Food Saga</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
