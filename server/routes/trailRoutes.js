import { Hono } from 'hono'
import { getTrails, getTrailById, createTrail, updateTrail, deleteTrail } from '../controllers/trailController.js'
import { getReviews, createReview, updateReview, deleteReview } from '../controllers/reviewController.js'
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js'

const router = new Hono()

router.get('/',    getTrails)
router.get('/:id', getTrailById)

router.post('/',      requireAdmin, createTrail)
router.put('/:id',    requireAdmin, updateTrail)
router.delete('/:id', requireAdmin, deleteTrail)

router.get('/:id/reviews',                    getReviews)
router.post('/:id/reviews',                   requireAuth, createReview)
router.put('/:id/reviews/:reviewId',          requireAuth, updateReview)
router.delete('/:id/reviews/:reviewId',       requireAuth, deleteReview)

export default router
