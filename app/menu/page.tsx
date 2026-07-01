"use client"

import { useState } from "react"
import Link from "next/link"

const menuItems = [
  // PASTA - Veg
  {
    name: "Veg Cheesy Alfredo Pasta",
    price: "₹160",
    category: "PASTA",
    subcategory: "Veg",
  },
  {
    name: "Veg Arrabiata Pasta",
    price: "₹150",
    category: "PASTA",
    subcategory: "Veg",
  },
  {
    name: "Veg Peri Peri Pasta",
    price: "₹180",
    category: "PASTA",
    subcategory: "Veg",
  },
  {
    name: "Veg Tandoori Cheesy Pasta",
    price: "₹190",
    category: "PASTA",
    subcategory: "Veg",
  },
  {
    name: "Veg Pink Sauce Pasta",
    price: "₹180",
    category: "PASTA",
    subcategory: "Veg",
  },

  // PASTA - Non-Veg
  {
    name: "Chicken Arrabiata Pasta",
    price: "₹200",
    category: "PASTA",
    subcategory: "Non-Veg",
  },
  {
    name: "Chicken Cheesy Alfredo Pasta",
    price: "₹220",
    category: "PASTA",
    subcategory: "Non-Veg",
  },
  {
    name: "Chicken Peri Peri Pasta",
    price: "₹220",
    category: "PASTA",
    subcategory: "Non-Veg",
  },
  {
    name: "Chicken Tandoori Cheesy Pasta",
    price: "₹240",
    category: "PASTA",
    subcategory: "Non-Veg",
  },
  {
    name: "Chicken Pink Sauce Pasta",
    price: "₹220",
    category: "PASTA",
    subcategory: "Non-Veg",
  },

  // PASTA - Special
  {
    name: "Special Baked Pasta",
    price: "₹60",
    category: "PASTA",
    subcategory: "Special",
    description: "Extra",
  },

  // ON DEMAND - Veg
  {
    name: "Veg Lasagna",
    price: "₹260",
    category: "ON DEMAND",
    subcategory: "Veg",
  },
  {
    name: "Veg Ramen",
    price: "₹150",
    category: "ON DEMAND",
    subcategory: "Veg",
  },
  {
    name: "Hot Pan Ramen",
    price: "₹150",
    category: "ON DEMAND",
    subcategory: "Veg",
  },

  // ON DEMAND - Non-Veg
  {
    name: "Chicken Lasagna",
    price: "₹280",
    category: "ON DEMAND",
    subcategory: "Non-Veg",
  },
  {
    name: "Chicken Ramen",
    price: "₹200",
    category: "ON DEMAND",
    subcategory: "Non-Veg",
  },
  {
    name: "Hot Pan Chicken Ramen",
    price: "₹200",
    category: "ON DEMAND",
    subcategory: "Non-Veg",
  },
  {
    name: "Hot Pan Chicken Ramen",
    price: "₹200",
    category: "ON DEMAND",
    subcategory: "Non-Veg",
  },

  // PIZZA - Veg
  {
    name: "Margherita Pizza",
    price: "₹140",
    category: "PIZZA",
    subcategory: "Veg",
  },
  {
    name: "Veg Delight Pizza",
    price: "₹150",
    category: "PIZZA",
    subcategory: "Veg",
  },
  {
    name: "Corn N Cheese Pizza",
    price: "₹160",
    category: "PIZZA",
    subcategory: "Veg",
  },
  {
    name: "Paneer Peri Peri Pizza",
    price: "₹180",
    category: "PIZZA",
    subcategory: "Veg",
  },
  {
    name: "Paneer Tandoori Pizza",
    price: "₹180",
    category: "PIZZA",
    subcategory: "Veg",
  },
  {
    name: "Paneer Makhani Pizza",
    price: "₹200",
    category: "PIZZA",
    subcategory: "Veg",
  },

  // PIZZA - Non-Veg
  {
    name: "Classic Chicken Cheese Pizza",
    price: "₹160",
    category: "PIZZA",
    subcategory: "Non-Veg",
  },
  {
    name: "Chicken Peri Peri Pizza",
    price: "₹180",
    category: "PIZZA",
    subcategory: "Non-Veg",
  },
  {
    name: "Chicken Tandoori Pizza",
    price: "₹180",
    category: "PIZZA",
    subcategory: "Non-Veg",
  },
  {
    name: "Butter Chicken Pizza",
    price: "₹200",
    category: "PIZZA",
    subcategory: "Non-Veg",
  },

  // ORIENTAL & INDO CHINESE - Veg
  {
    name: "Veg Hakka Noodles",
    price: "₹140",
    category: "ORIENTAL & INDO CHINESE",
    subcategory: "Veg",
  },
  {
    name: "Veg Schezwan Noodles",
    price: "₹140",
    category: "ORIENTAL & INDO CHINESE",
    subcategory: "Veg",
  },
  {
    name: "Veg Burnt Garlic N Chilly Noodles",
    price: "₹160",
    category: "ORIENTAL & INDO CHINESE",
    subcategory: "Veg",
  },

  // ORIENTAL & INDO CHINESE - Non-Veg
  {
    name: "Chicken Hakka Noodles",
    price: "₹170",
    category: "ORIENTAL & INDO CHINESE",
    subcategory: "Non-Veg",
  },
  {
    name: "Chicken Schezwan Noodles",
    price: "₹180",
    category: "ORIENTAL & INDO CHINESE",
    subcategory: "Non-Veg",
  },
  {
    name: "Chicken Burnt Garlic N Chilly Noodles",
    price: "₹200",
    category: "ORIENTAL & INDO CHINESE",
    subcategory: "Non-Veg",
  },

  // GARLIC BREAD & TOASTIES - Veg
  {
    name: "Cheesy Garlic Bread",
    price: "₹140",
    category: "GARLIC BREAD & TOASTIES",
    subcategory: "Veg",
  },
  {
    name: "Cheese Chilly Garlic Bread",
    price: "₹150",
    category: "GARLIC BREAD & TOASTIES",
    subcategory: "Veg",
  },
  {
    name: "Classic Corn Cheese Toasties",
    price: "₹160",
    category: "GARLIC BREAD & TOASTIES",
    subcategory: "Veg",
  },
  {
    name: "Veggie Cheesy Garlic Bread",
    price: "₹160",
    category: "GARLIC BREAD & TOASTIES",
    subcategory: "Veg",
  },

  // CHEF'S SPECIAL - Veg
  {
    name: "Kung Pao Paneer Stir Fry",
    price: "₹240",
    category: "CHEF'S SPECIAL",
    subcategory: "Veg",
  },
  {
    name: "Paneer in Peri Peri Sauce",
    price: "₹240",
    category: "CHEF'S SPECIAL",
    subcategory: "Veg",
  },

  // CHEF'S SPECIAL - Non-Veg
  {
    name: "Classic Fried Chicken Meal",
    price: "₹260",
    category: "CHEF'S SPECIAL",
    subcategory: "Non-Veg",
  },
  {
    name: "Kung Pao Chicken Stir Fry",
    price: "₹240",
    category: "CHEF'S SPECIAL",
    subcategory: "Non-Veg",
  },
  {
    name: "Fried Chicken in Peri Peri Sauce",
    price: "₹240",
    category: "CHEF'S SPECIAL",
    subcategory: "Non-Veg",
  },
  {
    name: "Mozzarella Baked Fried Chicken Meal",
    price: "₹299",
    category: "CHEF'S SPECIAL",
    subcategory: "Non-Veg",
  },

  // SANDWICHES - Veg
  {
    name: "Veg Coleslaw Sandwich",
    price: "₹80",
    category: "SANDWICHES",
    subcategory: "Veg",
  },
  {
    name: "Corn N Cheese Sandwich",
    price: "₹100",
    category: "SANDWICHES",
    subcategory: "Veg",
  },
  {
    name: "Veg Crunchy Sandwich",
    price: "₹100",
    category: "SANDWICHES",
    subcategory: "Veg",
  },
  {
    name: "Veg Crispy Mexican Sandwich",
    price: "₹120",
    category: "SANDWICHES",
    subcategory: "Veg",
  },
  {
    name: "Veg Triple Layer Fiesta",
    price: "₹160",
    category: "SANDWICHES",
    subcategory: "Veg",
  },
  {
    name: "Veg Mozzarella Baked Trio",
    price: "₹160",
    category: "SANDWICHES",
    subcategory: "Veg",
  },
  {
    name: "Paneer Tandoori Sandwich",
    price: "₹120",
    category: "SANDWICHES",
    subcategory: "Veg",
  },
  {
    name: "Paneer Triple Layer Fiesta",
    price: "₹160",
    category: "SANDWICHES",
    subcategory: "Veg",
  },
  {
    name: "Paneer Mozzarella Baked Trio",
    price: "₹200",
    category: "SANDWICHES",
    subcategory: "Veg",
  },

  // SANDWICHES - Non-Veg
  {
    name: "Chicken Tandoori Sandwich",
    price: "₹120",
    category: "SANDWICHES",
    subcategory: "Non-Veg",
  },
  {
    name: "Chicken Triple Layer Fiesta Sandwich",
    price: "₹160",
    category: "SANDWICHES",
    subcategory: "Non-Veg",
  },
  {
    name: "Chicken Mozzarella Baked Trio Sandwich",
    price: "₹200",
    category: "SANDWICHES",
    subcategory: "Non-Veg",
  },
  {
    name: "Chicken Mexican Sandwich",
    price: "₹160",
    category: "SANDWICHES",
    subcategory: "Non-Veg",
  },

  // WINGS
  {
    name: "Classic Fried Chicken Wings",
    price: "₹180",
    category: "WINGS",
    subcategory: "Chicken Wings / Chicken Drumsticks (5 Pieces)",
  },
  {
    name: "Peri Peri Chicken Wings",
    price: "₹200",
    category: "WINGS",
    subcategory: "Chicken Wings / Chicken Drumsticks (5 Pieces)",
  },
  {
    name: "Saucy Barbeque Chicken Wings",
    price: "₹200",
    category: "WINGS",
    subcategory: "Chicken Wings / Chicken Drumsticks (5 Pieces)",
  },
  {
    name: "Honey Chilly Glazed Chicken Wings",
    price: "₹220",
    category: "WINGS",
    subcategory: "Chicken Wings / Chicken Drumsticks (5 Pieces)",
  },
  {
    name: "Smokey Korean Fried Wings",
    price: "₹220",
    category: "WINGS",
    subcategory: "Chicken Wings / Chicken Drumsticks (5 Pieces)",
  },
]

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("ALL")

  const categories = ["ALL", "PASTA", "ON DEMAND", "PIZZA", "ORIENTAL & INDO CHINESE", "GARLIC BREAD & TOASTIES", "CHEF'S SPECIAL", "SANDWICHES", "WINGS"]
  const filteredItems =
    activeCategory === "ALL" ? menuItems : menuItems.filter((item) => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Header */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-8">MENU</h1>
          <div className="w-16 h-px bg-white opacity-50 mx-auto mb-8"></div>
          <p className="text-xl opacity-80 mb-8">Curated for the Discerning Palate</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light tracking-wider text-white mb-8">CATEGORIES</h2>
            <div className="flex justify-center">
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-8 py-4 text-lg font-medium tracking-wider transition-all duration-300 ${activeCategory === category
                        ? "bg-white text-black"
                        : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items List */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg prose-invert mx-auto">
            <div className="space-y-12">
              {filteredItems.map((item, index) => (
                <div key={index} className="border-b border-gray-800 pb-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-light text-white">{item.name}</h3>
                        {item.featured && (
                          <span className="bg-white/20 text-white px-3 py-1 text-xs font-medium tracking-wider">
                            FEATURED
                          </span>
                        )}
                      </div>
                      <p className="text-xl leading-relaxed text-white opacity-80">{item.description}</p>
                    </div>
                    <div className="text-2xl font-light text-white whitespace-nowrap">{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg prose-invert mx-auto text-center">
            <h2 className="text-3xl font-light tracking-wider text-white mb-8">Experience Our Creations Visually</h2>
            <p className="text-xl leading-relaxed mb-8 text-white opacity-80">
              Visit our Experience page to see our artisanal creations in all their visual glory. A feast for the eyes
              before it becomes a feast for the palate.
            </p>
            <Link
              href="/experience"
              className="inline-block bg-white text-black px-12 py-4 text-lg font-medium tracking-wider hover:bg-white hover:text-black hover:border hover:border-white transition-all duration-300"
            >
              EXPLORE EXPERIENCE
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm tracking-wide">© 2026 Food Saga</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
