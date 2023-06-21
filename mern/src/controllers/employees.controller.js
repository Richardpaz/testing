import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("Select * from employees");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "algo va mal" });
  }
};

export const createEmployees = async (req, res) => {
  try {
    const { nombre, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO employees (nombre,salary) VALUES (?,?)",
      [nombre, salary]
    );

    res.send({
      id: rows.insertId,
      nombre,
      salary,
    });
  } catch (error) {
    return res.status(500).json({ message: "algo va mal" });
  }
};

export const updateEmployees = async (req, res) => {
  try {
    const { id } = req.params;

    const { nombre, salary } = req.body;

    console.log(req.body);

    const [rows] = await pool.query(
      "UPDATE employees SET nombre = IFNULL(?,nombre) , salary = IFNULL(?,salary) WHERE id = ?",
      [nombre, salary, id]
    );

    if (rows.affectedRows === 0)
      return res.status(404).json({ message: "employee not found" });

    const [result] = await pool.query("SELECT * FROM employees WHERE id = ? ", [
      id,
    ]);

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "algo va mal" });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE from employees WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "employee not found" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "algo va mal" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    console.log("el parametro que te pasaron es ", req.params);
    const [rows] = await pool.query("SELECT * from employees WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length <= 0) {
      return (
        res.status(404).json("no encontrado") +
        console.log("no encontrado  " + req.params.id)
      );
    }
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "algo va mal" });
  }
};
