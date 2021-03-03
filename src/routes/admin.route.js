import express from "express";
import { adminAuth } from "../middleware";
import { INTERNAL_LINKS } from "../enum";
import { adminController } from "../controllers";

export default express
  .Router()
  .get(INTERNAL_LINKS.ADMIN.GET_ALL_USERS, adminController.getallusers)
  .post(INTERNAL_LINKS.ADMIN.ADD_DATA, adminAuth, adminController.addData)
  .get(INTERNAL_LINKS.ADMIN.GET_ALL_INSTRUCTOR, adminController.getInstructor)
  .get(INTERNAL_LINKS.ADMIN.GET_COUNTRY, adminController.getCountry)
  .get(INTERNAL_LINKS.ADMIN.GET_STATE, adminController.getState)
  .get(INTERNAL_LINKS.ADMIN.VIEW_USER, adminAuth, adminController.viewUser)
  .get(INTERNAL_LINKS.ADMIN.GET_CLASSES, adminAuth, adminController.getAllClass)
  .get(
    INTERNAL_LINKS.ADMIN.VIEW_USER_CLASSES,
    adminAuth,
    adminController.getUserClass
  )
  .get(INTERNAL_LINKS.ADMIN.VIEW_CLASS, adminAuth, adminController.viewClass)
  .put(
    INTERNAL_LINKS.ADMIN.REMOVE_CLASS,
    adminAuth,
    adminController.removeClass
  )
  .put(
    INTERNAL_LINKS.ADMIN.FEATURED_CLASS,
    adminAuth,
    adminController.isFeatured
  )
  .put(INTERNAL_LINKS.ADMIN.DELETE_USER, adminAuth, adminController.deleteUser)
  .put(INTERNAL_LINKS.ADMIN.IS_ACTIVE, adminAuth, adminController.isActive);
