import sql from "../../../../database/connection";
import { checkApiMethod, notFound404, handleErrors} from "../../../utility";
export default async function handler(req, res) {
  const { id } = req.query;
  /************* GET ALL COMMENTS FROM A CERTAIN SPONSOR *************/
  if (checkApiMethod(req, "GET") && typeof parseInt(id) === "number") {
    try {
      const comments =
        await sql`SELECT * FROM comments WHERE student_id = ${id} ORDER BY comment_id ASC`;
      res.json(comments);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END GET ALL COMMENTS FROM A CERTAIN SPONSOR *************/
  /************* DELETE ALL COMMENTS FROM A CERTAIN SPONSOR *************/
  if (checkApiMethod(req, "DELETE") && typeof parseInt(id) === "number") {
    try {
      const comments =
        (await sql`DELETE FROM comments WHERE student_id = ${id} RETURNING *`)[0];
      res.json(comments);
    } catch (error) {
      console.log(error);
      handleErrors(res);
    }
    return;
  }
  /************* END DELETE ALL COMMENTS FROM A CERTAIN SPONSOR *************/
  notFound404(res)
}
