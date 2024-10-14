import fs from 'fs';
import config from '../../config.cjs';

const handleGreeting = async (m, gss) => {
  try {
    const textLower = m.body.toLowerCase();

    const triggerWords = [
      'send', 'oni', 'dpn', 'එවන්න', 'one', 'dapan', 'upload',
      'send me', 'sent me', 'znt', 'snt', 'ayak', 'do', 'mee'
    ];

    if (triggerWords.includes(textLower)) {
      if (m.message && m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo) {
        const quotedMessage = m.message.extendedTextMessage.contextInfo.quotedMessage;

        if (quotedMessage) {
          // Check if it's an image
          if (quotedMessage.imageMessage) {
            const imageCaption = quotedMessage.imageMessage.caption;
            const imageUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
            await gss.sendMessage(m.from, {
              image: { url: imageUrl },
              caption: imageCaption,
              contextInfo: {
                mentionedJid: [m.sender], // Mention sender if needed
                isForwarded: false, // Mark as not forwarded
              },
            });
          }

          // Check if it's a video
          if (quotedMessage.videoMessage) {
            const videoCaption = quotedMessage.videoMessage.caption;
            const videoUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
            await gss.sendMessage(m.from, {
              video: { url: videoUrl },
              caption: videoCaption,
              contextInfo: {
                mentionedJid: [m.sender], // Mention sender if needed
                isForwarded: false, // Mark as not forwarded
              },
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export default handleGreeting;
