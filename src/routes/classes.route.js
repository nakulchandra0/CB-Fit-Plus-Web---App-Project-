import express from "express";

import { INTERNAL_LINKS } from "../enum";
import { classesController } from "../controllers";
import { auth, adminAuth } from "../middleware";

// ADD API as method GET => PUT => POST => DELETE
export default express
  .Router()
  .get(
    INTERNAL_LINKS.CLASSES.GET_SCHEDULE_CLASSES,
    auth,
    classesController.getScheduleClasses
  )
  .post(
    INTERNAL_LINKS.CLASSES.POST_CLASS,
    adminAuth,
    classesController.postClass
  )
  .post(
    INTERNAL_LINKS.CLASSES.BOOKMARK_CLASS,
    auth,
    classesController.bookmarkClass
  )
  .post(
    INTERNAL_LINKS.CLASSES.COMPLETE_CLASS,
    auth,
    classesController.completeClass
  )
  .get(
    INTERNAL_LINKS.CLASSES.GET_ALL_CLASSES,
    auth,
    classesController.getAllClasses
  )
  .get(
    INTERNAL_LINKS.CLASSES.GET_HOME_CLASSES,
    auth,
    classesController.getHomeClasses
  )
  .get(
    INTERNAL_LINKS.CLASSES.GET_TUTOR_COUNT,
    auth,
    classesController.getTutorCount
  )
  .get(
    INTERNAL_LINKS.CLASSES.GET_ONDEMAND_CLASSES,
    auth,
    classesController.getonDemandClasses
  );
