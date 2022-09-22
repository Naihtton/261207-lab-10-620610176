import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  if (req.method === "DELETE") {
    const rooms = readDB();
    //read value from URL
    const roomId = req.query.roomId;
    const messageId = req.query.messageId;
    const checkRoom = rooms.findIndex((x) => x.roomId === roomId);
    if (checkRoom === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    const mes = rooms[checkRoom].messages;
    const checkMessage = mes.findIndex((x) => x.messageId === messageId);
    if (checkMessage === -1)
      return res.status(404).json({ ok: false, message: "Invalid message id" });
    mes.splice(checkMessage, 1);
    writeDB(rooms);
    return res.json({ ok: true });
  }
}
