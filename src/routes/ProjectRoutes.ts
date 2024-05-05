import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErros } from "../middelware/validator";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middelware/project";
import { taskBelongToProject, taskExists } from "../middelware/task";
const router = Router();

router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",

  param("id").isMongoId().withMessage("ID de mongo no es valido"),
  handleInputErros,
  ProjectController.getByProject
);

router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripcion es obligatorio"),
  handleInputErros,
  ProjectController.createProjects
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID de mongo no es valido"),
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripcion es obligatorio"),
  handleInputErros,
  ProjectController.updateProject
);

router.delete(
  "/:id",

  param("id").isMongoId().withMessage("ID de mongo no es valido"),
  handleInputErros,
  ProjectController.deleteProject
);

/** Router for tasks */
router.param("projectId", projectExists);

router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
  body("description").notEmpty().withMessage("La descripcion es obligatorio"),
  TaskController.createTask
);

router.param("taskId", taskExists);
router.param("taskId", taskBelongToProject);

router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.get(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("ID no es valido"),
  handleInputErros,
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("ID no es valido"),
  body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
  body("description").notEmpty().withMessage("La descripcion es obligatorio"),
  handleInputErros,
  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("ID no es valido"),
  handleInputErros,
  TaskController.deleteTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("projectId").isMongoId().withMessage("ID no es valido"),
  body("status").notEmpty().withMessage("El estado es obligatorio"),
  handleInputErros,
  TaskController.updateStatus
);

export default router;
