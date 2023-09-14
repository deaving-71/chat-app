import { Prisma } from "../../lib";
import { CallbackResponse, IOHandler } from "../../types";

type SendMessagePayload = {
  channelId: string;
  memberId: string;
  messageContent: string;
  cb: CallbackResponse;
};

const ChannelsHandler: IOHandler = (app, socket) => {
  socket.on("channel:join-channel", joinChannel);
  // socket.on("channel:join-room", joinRoom);
  socket.on("channel:send-message", sendMessage);

  async function joinChannel(channelId: string, cb: CallbackResponse) {
    try {
      const channel = await getChannel(channelId);
      if (!channel) {
        // cb({
        //     success: false,
        //     message: "Invalid channel ID.",
        //     data: null,
        // })
        return;
      }
      const isMember = channel.members.some(
        (member) => member.userId === socket.data.id
      );
      if (isMember) {
        // cb({
        //     success: false,
        //     message: "You are already a member of this channel.",
        //     data: null,
        // })
        return;
      }
      const joinedChannel = await Prisma.channel.update({
        where: {
          id: channelId,
        },
        data: {
          members: {
            connect: {
              userId: socket.data.id,
            },
          },
        },
        include: {
          members: true,
          messages: true,
        },
      });
      socket.join(joinedChannel.id);
      socket.emit("channel:joined-channel", joinedChannel);
      console.log(`${socket.data.username} joined channel ${joinChannel.name}`);
    } catch (err) {
      console.log(err);
    }
  }
  /*
  function joinRoom(channelId: string) {
    socket.join(channelId);
    socket.emit("channel:joined-room", `joined channel of id: ${channelId}`);
    console.log(`${socket.data.username} entered channel: ${channelId}`);
  }
*/

  async function sendMessage(payload: SendMessagePayload) {
    const { channelId, memberId, cb, messageContent } = payload;

    try {
      const channel = await getChannel(channelId);
      if (!channel) {
        cb({
          success: false,
          message: "Invalid channel ID.",
          data: null,
        });
        return;
      }
      const message = await Prisma.channelMessage.create({
        data: {
          channelId,
          senderId: memberId,
          content: messageContent,
        },
      });
      cb({
        success: true,
        message: "Message received.",
        data: message,
      });
      app.io.to(channel.id).emit("channel:received-message", message);
      console.log(
        `${socket.data.username} : ${channel.name} >>> ${message.content}`
      );
    } catch (err) {
      console.log(err);
    }
  }
};

async function getChannel(channelId: string) {
  return await Prisma.channel.findUnique({
    where: {
      id: channelId,
    },
    include: {
      members: true,
    },
  });
}

export default ChannelsHandler;
