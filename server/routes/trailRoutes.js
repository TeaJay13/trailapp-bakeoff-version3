import { Hono } from 'hono'
import { getTrails, getTrailById, createTrail, updateTrail, deleteTrail } from '../controllers/trailController.js'
import { getReviews, createReview } from '../controllers/reviewController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = new Hono()

router.get('/',    getTrails)
router.get('/:id', getTrailById)

router.post('/',      requireAuth, createTrail)
router.put('/:id',    requireAuth, updateTrail)
router.delete('/:id', requireAuth, deleteTrail)

router.get('/:id/reviews',  getReviews)
router.post('/:id/reviews', requireAuth, createReview)

export default router
