import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const proyectos = await Project.find({});
      res.json(proyectos);
    } catch (error) {
      console.log(error);
    }
  };

  static getByProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const proyecto = await Project.findById(id).populate("tasks");
      if (!proyecto) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error.message });
      }
      res.json(proyecto);
    } catch (error) {
      console.log(error);
    }
  };

  static createProjects = async (req: Request, res: Response) => {
    try {
      const proyecto = await Project.find({
        projectName: req.body.projectName,
      });
      if (proyecto && proyecto.length) {
        const error = new Error("Nombre del proyecto ya existe!");
        return res.status(500).json({ error: error.message });
      }
      const project = new Project(req.body);
      //const project = await Project.create(req.body);
      await project.save();
      res.json(project);
    } catch (error) {
      console.log(error.message);
    }
  };
  static updateProject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      //const proyecto = await Project.findByIdAndUpdate(id, req.body);
      const proyecto = await Project.findById(id);
      if (!proyecto) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error.message });
      }
      proyecto.clientName = req.body.clientName;
      proyecto.projectName = req.body.projectName;
      proyecto.description = req.body.description;
      await proyecto.save();
      res.json(proyecto);
    } catch (error) {
      console.log("error", error);
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      //const proyecto = await Project.findByIdAndDelete(id);
      const proyecto = await Project.findById(id);

      if (!proyecto) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error.message });
      }

      proyecto.deleteOne();
      res.send("Proyecto eliminado correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
