import { Router } from "express";
import * as adminTemplateController from "../Controller/TemplateController.js";

import verifyToken from "../middelwares/verifyToken.js";

const adminTemplateRouter = Router();

adminTemplateRouter
  .route("/")
  .get(verifyToken, adminTemplateController.getAllTemplates)
  .post(verifyToken, adminTemplateController.createTemplate);

adminTemplateRouter
  .route("/:id")
  .get(verifyToken, adminTemplateController.getSingleTemplate)
  .put(verifyToken, adminTemplateController.updateTemplate)
  .delete(verifyToken, adminTemplateController.deleteTemplate);

export default adminTemplateRouter;
