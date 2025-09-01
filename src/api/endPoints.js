
import express from "express";

import { catchErrors } from "../decorators/index.js";
import setStatus from "../controllers/charger/setStatus.js";
import createUser from "../controllers/user/create.js";
import getById from "../controllers/user/getById.js";
import updateUser from "../controllers/user/update.js";
import passport from '../config/passport.js';
import login from "../controllers/auth/login.js";
import createProduct from "../controllers/product/create.js";
import updateProduct from "../controllers/product/update.js";
import getProducts from "../controllers/product/getAll.js";
import createPurchase from "../controllers/purchase/create.js";
import getUserPurchases from "../controllers/purchase/getByUser.js";
import markAsUsed from "../controllers/purchase/markAsUsed.js";
import createOrganization from "../controllers/organization/createOrganization.js";
import getOrganizationsByUser from "../controllers/organization/getByUser.js";
import updateOrganization from "../controllers/organization/update.js";
import createInstallation from "../controllers/installation/create.js";
import getInstallationsByOrganization from "../controllers/installation/getByOrganization.js";
import updateInstallation from "../controllers/installation/update.js";
import createStation from "../controllers/station/create.js";
import getStationsByInstallation from "../controllers/station/getByInstallation.js";
import updateStatus from "../controllers/station/updateStatus.js";
import createPayment from "../controllers/payment/create.js";
import getPaymentsByPurchase from "../controllers/payment/getByPurchase.js";
import updatePaymentStatus from "../controllers/payment/updateStatus.js";
import startActivation from "../controllers/activation/create.js";
import completeActivation from "../controllers/activation/complete.js";
import addProductToOrganization from "../controllers/organization/createProduct.js";
import addProductToInstallation from "../controllers/installation/createProduct.js";
import setBelongsToOrganization from "../controllers/organization/setBelongsToOrganization.js";
import setBelongsToInstallation from "../controllers/installation/setBelongsToInstallation.js";
import checkEntityActive from "../controllers/product/checkEntityActive.js";
import checkStationInstallationAndOrganizationActive from "../controllers/station/checkEntityActive.js";
import { checkStationInUse } from "../controllers/station/checkIsFree.js";
import { setInUse } from "../controllers/station/setInUse.js";
import { getUserActiveActivations } from "../controllers/purchase/getActivePurchasesByUser.js";
import getStationByID from "../controllers/station/getById.js";
import getInstallations from "../controllers/installation/get.js";
import getProductsByInstallation from "../controllers/product/getByInstallation.js";
import paymentCallback from "../controllers/wompi/paymentCallback.js";
import checkAdmin from "../controllers/auth/checkAdmin.js";
import getProductsByOrganization from "../controllers/product/getByOrganization.js";
import getProductsByInstallationExclusive from "../controllers/product/getByInstallationExclusive.js";
import checkPaymentStatus from "../controllers/payment/checkPaymentStatus.js";
import { checkStationOwner } from "../controllers/station/checkOwner.js";
import deleteStation from "../controllers/station/delete.js";
import { checkProductOwner } from "../controllers/product/checkOwner.js";
import softDeleteProduct from "../controllers/product/delete.js";
import createRecoveryToken from "../controllers/recoveryToken/create.js";
import checkToken from "../controllers/recoveryToken/checkToken.js";
import updateUserPassword from "../controllers/user/updatePassword.js";
import checkPurchaseStationValid from "../controllers/purchase/checkPurchaseStationValid.js";

const router = express.Router();

// Raw Info
router.post("/users", catchErrors(createUser));
router.get("/users/:id", passport.authenticate('jwt', { session: false }), catchErrors(getById));
router.patch("/users/:id", passport.authenticate('jwt', { session: false }), catchErrors(updateUser));
router.patch("/user/restorePassword", catchErrors(checkToken), catchErrors(updateUserPassword));
router.patch("/user/updatePassword", passport.authenticate('local', { session: false }), catchErrors(updateUserPassword));

router.get("/setStatus/:status", catchErrors(setStatus));

router.post("/users/login", passport.authenticate('local', { session: false }), catchErrors(login));

//router.post("/product", passport.authenticate('jwt', { session: false }), catchErrors(createProduct));
router.patch("/product/:id", passport.authenticate('jwt', { session: false }), catchErrors(updateProduct));
router.get("/product", passport.authenticate('jwt', { session: false }), catchErrors(getProducts));
router.get("/product/byInstallation/:installationId", passport.authenticate('jwt', { session: false }), catchErrors(getProductsByInstallation));
router.get("/product/byInstallationExclusive/:installationId", passport.authenticate('jwt', { session: false }), catchErrors(getProductsByInstallationExclusive));
router.get("/product/byOrganization/:organizationId", passport.authenticate('jwt', { session: false }), catchErrors(checkAdmin), catchErrors(getProductsByOrganization));
router.delete("/product/:productId", passport.authenticate('jwt', { session: false }), catchErrors(checkAdmin), catchErrors(checkProductOwner), catchErrors(softDeleteProduct));

router.post("/purchase", passport.authenticate('jwt', { session: false }), catchErrors(checkEntityActive), catchErrors(createPurchase));
router.get("/purchase/byUser", passport.authenticate('jwt', { session: false }), catchErrors(getUserPurchases));
router.patch("/purchase/markAsUsed/:id", passport.authenticate('jwt', { session: false }), catchErrors(markAsUsed));
router.get("/purchase/activeByUser", passport.authenticate('jwt', { session: false }), catchErrors(getUserActiveActivations));

router.post("/organization", passport.authenticate('jwt', { session: false }), catchErrors(checkAdmin), catchErrors(createOrganization));
router.get("/organization/byUser", passport.authenticate('jwt', { session: false }), catchErrors(checkAdmin), catchErrors(getOrganizationsByUser));
router.patch("/organization/:id", passport.authenticate('jwt', { session: false }), catchErrors(updateOrganization));

router.post("/installation/:organizationId", passport.authenticate('jwt', { session: false }), catchErrors(checkAdmin), catchErrors(createInstallation));
router.get("/installation", passport.authenticate('jwt', { session: false }), catchErrors(getInstallations));
router.get("/installation/byOrganization/:organizationId", passport.authenticate('jwt', { session: false }), catchErrors(checkAdmin), catchErrors(getInstallationsByOrganization));
router.patch("/installation/:id", passport.authenticate('jwt', { session: false }), catchErrors(checkAdmin), catchErrors(updateInstallation));

router.post("/station", passport.authenticate('jwt', { session: false }), catchErrors(checkAdmin), catchErrors(createStation));
router.get("/station/:stationID", passport.authenticate('jwt', { session: false }), catchErrors(getStationByID));
router.get("/station/byInstallation/:installationId", passport.authenticate('jwt', { session: false }), catchErrors(getStationsByInstallation));
router.patch("/station/:id", passport.authenticate('jwt', { session: false }), catchErrors(checkAdmin), catchErrors(updateStatus));
router.delete("/station/:stationId", passport.authenticate('jwt', { session: false }), catchErrors(checkAdmin), catchErrors(checkStationOwner), catchErrors(deleteStation));

router.post("/payment", passport.authenticate('jwt', { session: false }), catchErrors(createPayment));
router.get("/payment/byPurchase/:purchaseId", passport.authenticate('jwt', { session: false }), catchErrors(getPaymentsByPurchase));
router.patch("/payment/:id", passport.authenticate('jwt', { session: false }), catchErrors(updatePaymentStatus));

router.post("/activation", passport.authenticate('jwt', { session: false }), catchErrors(checkPurchaseStationValid), catchErrors(checkStationInstallationAndOrganizationActive), catchErrors(checkPaymentStatus), catchErrors(checkStationInUse), catchErrors(startActivation));
//router.get("/activation/byPurchase/:purchaseId", passport.authenticate('jwt', { session: false }), catchErrors(getactivationsByPurchase));
router.patch("/activation/:id", passport.authenticate('jwt', { session: false }), catchErrors(completeActivation));

router.post("/organization/createProduct/:id", passport.authenticate('jwt', { session: false }), catchErrors(checkAdmin), setBelongsToOrganization, catchErrors(createProduct), catchErrors(addProductToOrganization));
router.post("/installation/createProduct/:id", passport.authenticate('jwt', { session: false }), catchErrors(checkAdmin), setBelongsToInstallation, catchErrors(createProduct), catchErrors(addProductToInstallation));

router.post("/wompiCallback", paymentCallback);

router.post("/recoveryToken", catchErrors(createRecoveryToken));

export default router;