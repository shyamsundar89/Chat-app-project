import Message from '../models/Message.js';


// READ - Get all messages between two users
export const getAllMessages = async (req, res) => {
    try {
        // Fetch all users from the database
        const messageExists = await Message.find();
        if (messageExists.length === 0) {
          return res.status(400).json({ message: 'No Message Found!!' });
        }
    
        res.status(201).json({ message: 'Message fetched successfully', messageExists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// CREATE - Send a new message
export const sendMessage = async (req, res) => {
    const { sender, receiver, content } = req.body;

    try {
        const newMessage = new Message({ sender, receiver, content });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send message' });
    }
};

// READ - Get all messages between two users
export const getMessages = async (req, res) => {
    const { sender, receiver } = req.query; // Use query instead to read params
    try {
      const messages = await Message.find({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender }
        ]
      }).sort({ createdAt: 1 });
  
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch messages' });
    }
  };
  

// UPDATE - Edit a message
export const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    // if (message.sender.toString() !== req.user)
    //   return res.status(403).json({ message: 'Unauthorized' });

    message.content = content;
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update message' });
  }
};

// DELETE - Delete a message
export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    // if (message.sender.toString() !== req.user)
    //   return res.status(403).json({ message: 'Unauthorized' });

    await Message.findByIdAndDelete(id);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete message' });
  }
};
