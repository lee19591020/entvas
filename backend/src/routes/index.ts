import express, { Request, Response, NextFunction} from 'express'
import loginRouter from '../routes/authentication';
import registationRouter from '../routes/registration';
import locationRouter from '../routes/location';
import adminRouter from '../routes/admin';
import Auth from '@/middleware/auth-middleware';
import { clients, eventMiddleware } from '@/utils/sse';


const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('Everything seems working fine for Users API');
});



router.get('/events', (req: Request, res: Response) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no'
  })
  res.flushHeaders()

  // add them to our list
  clients.push(res)

  // remove when they disconnect
  req.on('close', () => {
    const idx = clients.indexOf(res)
    if (idx >= 0) clients.splice(idx, 1)
  })
})


router.use(loginRouter)
router.use(registationRouter)

router.use(
  '/location',
  locationRouter
)

router.use(
  '/admin',
  Auth,
  eventMiddleware('pageView', (req, res) => ({
    page: req.originalUrl,
    browser: req.headers['user-agent'],
    userData: {
      fname: req.admin.fname,
      lname: req.admin.lname
    },
  })),
  adminRouter
);

export default router