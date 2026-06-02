import { Hono } from 'hono'
import { getTrails, getTrailById, createTrail, updateTrail, deleteTrail } from '../controllers/trailController.js'

const router = new Hono()

router.get('/',       getTrails)
router.get('/:id',    getTrailById)
router.post('/',      createTrail)
router.put('/:id',    updateTrail)
router.delete('/:id', deleteTrail)

export default router
