import router from "./AdminRegister.js";
import exprees from exprees;
import WompiController from "../controller/womiController.js";

const Router = exprees.Router();

router.route("/token").post(WompiController.token);
router.route("/pagment").post(WompiController.payment);

export default router;