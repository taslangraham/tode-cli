import { Request, Response, Router } from "express";
module.exports = () => {
  const router = Router();
  /**
   * Create a new Item
   */
  router.post("/", async (req, res) => {
    return res.send('$controller-name/ - POST');
  });

  /**
   * Get all Items
   */
  router.get("/", (req: Request, res: Response) => {
    res.send("$controller-name/  - GET");
  });

  /**
   * Get an Item by Id
   */
  router.get("/:id", (req: Request, res: Response) => {
    res.send("$controller-name/  - GET /id");

  });

  /**
   * Update an Item
   */
  router.patch("/:id", (req: Request, res: Response) => {
    res.send("$controller-name/  - PATCH /id");

  });

  return router;
};
