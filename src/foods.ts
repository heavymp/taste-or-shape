export interface Food {
  id: string
  name: string
  image: string
  blurb: string
}

export const foods: Food[] = [
  { id: 'hot-dog', name: 'Hot Dog', image: '/foods/hot-dog.jpg', blurb: 'The classic ballpark icon.' },
  { id: 'bratwurst', name: 'Bratwurst', image: '/foods/bratwurst.jpg', blurb: 'Grilled, snappy, unapologetic.' },
  { id: 'corndog', name: 'Corn Dog', image: '/foods/corndog.jpg', blurb: 'Fairground royalty on a stick.' },
  { id: 'frankfurter', name: 'Frankfurter', image: '/foods/frankfurter.jpg', blurb: 'A hot dog with a passport.' },
  { id: 'sausage', name: 'Sausage Links', image: '/foods/sausage.jpg', blurb: 'Twisty little commitment issues.' },
  { id: 'kielbasa', name: 'Kielbasa', image: '/foods/kielbasa.jpg', blurb: 'Smoky, hefty, proud of it.' },
  { id: 'banana', name: 'Banana', image: '/foods/banana.jpg', blurb: 'Nature’s peel-and-reveal snack.' },
  { id: 'cucumber', name: 'Cucumber', image: '/foods/cucumber.jpg', blurb: 'Cool, green, suspiciously long.' },
  { id: 'carrot', name: 'Carrot', image: '/foods/carrot.jpg', blurb: 'Crunchy and pointedly orange.' },
  { id: 'zucchini', name: 'Zucchini', image: '/foods/zucchini.jpg', blurb: 'Summer squash with main-character energy.' },
  { id: 'asparagus', name: 'Asparagus', image: '/foods/asparagus.jpg', blurb: 'A whole bundle of spears.' },
  { id: 'celery', name: 'Celery', image: '/foods/celery.jpg', blurb: 'Crunch that echoes in the room.' },
  { id: 'pickle', name: 'Dill Pickle', image: '/foods/pickle.jpg', blurb: 'Briny and boldly cylindrical.' },
  { id: 'okra', name: 'Okra', image: '/foods/okra.jpg', blurb: 'Little green rockets from the garden.' },
  { id: 'corn', name: 'Corn on the Cob', image: '/foods/corn.jpg', blurb: 'Butter magnet. Cob energy.' },
  { id: 'baguette', name: 'Baguette', image: '/foods/baguette.jpg', blurb: 'Parisian loaf, zero subtlety.' },
  { id: 'pretzel', name: 'Soft Pretzel', image: '/foods/pretzel.jpg', blurb: 'Salted dough with soft curves.' },
  { id: 'churro', name: 'Churro', image: '/foods/churro.jpg', blurb: 'Cinnamon sugar on a stick.' },
  { id: 'eclair', name: 'Éclair', image: '/foods/eclair.jpg', blurb: 'Cream-filled pastry elegance.' },
  { id: 'cannoli', name: 'Cannoli', image: '/foods/cannoli.jpg', blurb: 'Crispy tube, sweet filling.' },
  { id: 'twinkie', name: 'Twinkie', image: '/foods/twinkie.jpg', blurb: 'Golden sponge, mysterious shelf life.' },
  { id: 'popsicle', name: 'Popsicle', image: '/foods/popsicle.jpg', blurb: 'Frozen treat on a wooden stick.' },
  { id: 'burrito', name: 'Burrito', image: '/foods/burrito.jpg', blurb: 'A wrap that means business.' },
  { id: 'spring-roll', name: 'Spring Roll', image: '/foods/spring-roll.jpg', blurb: 'Crispy cylinder of joy.' },
  { id: 'plantain', name: 'Plantain', image: '/foods/plantain.jpg', blurb: 'Banana’s sturdier cousin.' },
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
