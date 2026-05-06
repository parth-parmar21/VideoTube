import { Router } from 'express';
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    subscriptionStatus,
    toggleSubscription,
} from "../controllers/subscription.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/c/:channelId")
    .post(toggleSubscription)
    .get(subscriptionStatus);

router
    .route("/c/:channelId/subscribers")
    .get(getUserChannelSubscribers);

router
    .route("/u/:subscriberId")
    .get(getSubscribedChannels);

export default router