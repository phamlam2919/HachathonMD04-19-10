import express, { Request, Response } from "express";
const router = express.Router();
import db from "../utils/database";

router.post("/todo", async (req: Request, res: Response) => {
    try {
        const { name, status } = req.body;
        const data = await db.execute(
            `INSERT INTO todo (name, status) VALUES (?, ?)`,
            [name, status]
        );
        res.json({
            message: "Thêm thành công",
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/todo", async (req: Request, res: Response) => {
    try {
        const data = await db.execute("SELECT * FROM todo");
        const [row] = data;
        res.json({
            users: row,
        });
    } catch (error) {
        res.json({
            message: "Lấy danh sách người dùng không thành công",
        });
    }
});

router.put("/todo/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, status } = req.body;

    try {
        const [row]: any = await db.execute(
            `SELECT * FROM todo WHERE todo_id = ?`,
            [id]
        );

        if (row.length === 0) {
            return res.json({
                message: "Không tìm thấy người dùng để cập nhật.",
            });
        } else {
            await db.execute(`UPDATE todo SET status = ? WHERE todo_id = ?`, [
                1,
                id,
            ]);

            return res.json({
                message: "Cập nhật thông tin người dùng thành công.",
            });
        }
    } catch (error) {
        return res.json({ error: error });
    }
});

router.delete("/todo/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await db.execute("DELETE FROM todo WHERE todo_id = ?", [id]);
        const data = await db.execute("SELECT * FROM todo");
        res.json({
            message: "Xóa thành công",
            user: data[0],
        });
    } catch (error) {
        res.json({
            message: "Xóa người dùng không thành công",
        });
        console.log(error);
    }
});

export default router;
