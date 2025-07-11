import Chat from '../models/Chat.js';

export async function getChats(req, res) {
  try {
    const user = req.user;

    const chats = await Chat.find({ user: user.id }).sort({ updatedAt: -1 });

    return res.status(200).json(chats);
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function newChat(req, res) {
  try {
    const user = req.user;
    const { title, cnv } = req.body;

    const newChat = new Chat({ user: user.id, title, cnv });

    await newChat.save();

    return res.status(201).json(newChat);
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateChatConv(req, res) {
  try {
    const user = req.user;
    const { cnv } = req.body;
    const { chatId } = req.params;

    const updatedChat = await Chat.findOne({ _id: chatId, user: user.id });

    updatedChat.cnv.push(...cnv);

    await updatedChat.save();

    return res.status(200).json(updatedChat);
  } catch (error) {
    console.error('Error updating chat:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function renameChat(req, res) {
  try {
    const user = req.user;
    const { title } = req.body;
    const { chatId } = req.params;

    const updatedChat = await Chat.findOne({ _id: chatId, user: user.id });

    updatedChat.title = title;

    await updatedChat.save();

    return res.status(200).json(updatedChat);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function deleteChat(req, res) {
  try {
    const user = req.user;
    const { chatId } = req.params;

    await Chat.deleteOne({ _id: chatId, user: user.id });

    return res.status(200).json({ message: 'Chat deleted successfully' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
