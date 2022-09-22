import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const id = req.query.roomId;
    const check = rooms.find((x) => x.roomId === id);
    const room = rooms.find((x) => x.roomId === id);

    if (check === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });

    return res.status(200).json({ ok: true, messages: room.messages });
  } else if (req.method === "POST") {
    const rooms = readDB();

    //read request body
    const text = req.body.text;

    //create new id
    const newId = uuidv4();

    const id = req.query.roomId;

    const room = rooms.findIndex((x) => x.roomId === id);

    if (typeof text !== "string" || text.length === 0)
      return res.status(400).json({ ok: false, message: "Invalid text input" });
    if (room === -1)
      return res.status(404).json({ ok: false, message: "Invalid message id" });

    const addText = {
      messageId: newId,
      text: text,
    };

    rooms[room].messages.push(addText);
    writeDB(rooms);

    return res.status(200).json({
      ok: true,
      messages: addText,
    });
  }
}
