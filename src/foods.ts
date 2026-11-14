export interface Food {
  id: string
  name: string
  image: string
  blurb: string
}

export const foods: Food[] = [
  { id: 'hot-dog', name: 'Hot Dog', image: '/foods/hot-dog.jpg', blurb: 'Mustard optional. Mouth optional? Debatable.' },
  { id: 'bratwurst', name: 'Bratwurst', image: '/foods/bratwurst.jpg', blurb: 'Thick, German, and ready for the grill.' },
  { id: 'corndog', name: 'Corn Dog', image: '/foods/corndog.jpg', blurb: 'Battered, deep-fried, and begging for a hand.' },
  { id: 'frankfurter', name: 'Frankfurter', image: '/foods/frankfurter.jpg', blurb: 'European length with American enthusiasm.' },
  { id: 'sausage', name: 'Sausage Links', image: '/foods/sausage.jpg', blurb: 'A matching set. For the ambitious.' },
  { id: 'kielbasa', name: 'Kielbasa', image: '/foods/kielbasa.jpg', blurb: 'Smoky, heavy, and unbothered by subtlety.' },
  { id: 'banana', name: 'Banana', image: '/foods/banana.jpg', blurb: 'Peel with your teeth if you’re feeling brave.' },
  { id: 'cucumber', name: 'Cucumber', image: '/foods/cucumber.jpg', blurb: 'Cool to the touch. Warming to the imagination.' },
  { id: 'carrot', name: 'Carrot', image: '/foods/carrot.jpg', blurb: 'Good for your eyes. Also for staring.' },
  { id: 'zucchini', name: 'Zucchini', image: '/foods/zucchini.jpg', blurb: 'Garden-grown and ready for stuffing.' },
  { id: 'asparagus', name: 'Asparagus', image: '/foods/asparagus.jpg', blurb: 'A whole bouquet of little green ambitions.' },
  { id: 'celery', name: 'Celery', image: '/foods/celery.jpg', blurb: 'Crunchy, fibrous, and weirdly confident.' },
  { id: 'pickle', name: 'Dill Pickle', image: '/foods/pickle.jpg', blurb: 'Briny, bold, and permanently hard.' },
  { id: 'okra', name: 'Okra', image: '/foods/okra.jpg', blurb: 'Slippery when cooked. Just saying.' },
  { id: 'corn', name: 'Corn on the Cob', image: '/foods/corn.jpg', blurb: 'Butter up and go row by row.' },
  { id: 'baguette', name: 'Baguette', image: '/foods/baguette.jpg', blurb: 'Long, crusty, and very French about it.' },
  { id: 'pretzel', name: 'Soft Pretzel', image: '/foods/pretzel.jpg', blurb: 'Twisted, salted, and soft in the middle.' },
  { id: 'churro', name: 'Churro', image: '/foods/churro.jpg', blurb: 'Sugar-dusted and made for dipping.' },
  { id: 'eclair', name: 'Éclair', image: '/foods/eclair.jpg', blurb: 'Cream-filled and dressed for evening.' },
  { id: 'cannoli', name: 'Cannoli', image: '/foods/cannoli.jpg', blurb: 'Crispy shell, sweet surprise inside.' },
  { id: 'twinkie', name: 'Twinkie', image: '/foods/twinkie.jpg', blurb: 'Golden, creamy, and immortal, darling.' },
  { id: 'popsicle', name: 'Popsicle', image: '/foods/popsicle.jpg', blurb: 'Lick carefully. Melts under pressure.' },
  { id: 'burrito', name: 'Burrito', image: '/foods/burrito.jpg', blurb: 'Stuffed tight and wrapped for takeout.' },
  { id: 'spring-roll', name: 'Spring Roll', image: '/foods/spring-roll.jpg', blurb: 'Crispy cylinder with secrets inside.' },
  { id: 'plantain', name: 'Plantain', image: '/foods/plantain.jpg', blurb: 'Thicker than a banana. No notes.' },
]

/** Simple string hash → unsigned 32-bit */
function hashString(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export type Reason = 'shape' | 'taste'

/**
 * Per name + food, pick shape or taste.
 * Names starting with "D" (any case) always get shape.
 */
export function reasonFor(name: string, foodId: string): Reason {
  const trimmed = name.trim()
  if (/^d/i.test(trimmed)) return 'shape'
  const seed = hashString(`${trimmed.toLowerCase()}::${foodId}`)
  return seed % 2 === 0 ? 'shape' : 'taste'
}

export function tallyReasons(name: string): { shape: number; taste: number } {
  return foods.reduce(
    (acc, food) => {
      const r = reasonFor(name, food.id)
      acc[r] += 1
      return acc
    },
    { shape: 0, taste: 0 },
  )
}
