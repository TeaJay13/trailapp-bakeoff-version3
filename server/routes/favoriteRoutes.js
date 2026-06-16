import { Hono } from 'hono'
import { getFavorites, getFavoriteIds, addFavorite, removeFavorite } from '../controllers/favoriteController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = new Hono()

router.get('/',              requireAuth, getFavorites)
router.get('/ids',           requireAuth, getFavoriteIds)
router.post('/:trailId',     requireAuth, addFavorite)
router.delete('/:trailId',   requireAuth, removeFavorite)

export default router
