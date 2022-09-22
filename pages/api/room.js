import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();
  res.json({
    ok: true,
    rooms: rooms.map((room) => {
      return {
        roomId: room.roomId,
        roomName: room.roomName,
      };
    }),
  });
}
