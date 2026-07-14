import router from "./AdminRegister";
import exprees from exprees;
import WompiController from "../controller/womiController";

const Router = exprees.Router();

router.route("/token").post(WompiController.token);
router.route("/pagment").post(WompiController.payment);

export default router;