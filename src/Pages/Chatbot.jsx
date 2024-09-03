import { Button, Stack, Text, Heading, Card, CardBody, CardHeader} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Chatbot = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [avatarResponse, setAvatarResponse] = useState("");
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (avatarResponse) {
      speak(avatarResponse);
    }
  }, [avatarResponse]);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => console.error(event.error);

    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      setTranscript(currentTranscript);

      if (event.results[0].isFinal) {
        recognition.stop();
        handleUserMessage(currentTranscript);
      }
    };
    recognition.start();
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleUserMessage = (transcript) => {
    const data = {
      contents: [{ parts: [{ text: transcript }] }],
    };
    axios
      .post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.gemini_API_KEY}`,
        data
      )
      .then((res) => {
        console.log("res", res.data.candidates[0].content.parts[0].text);
        const textResponse = res.data.candidates[0].content.parts[0].text;
        setAvatarResponse(textResponse);
      })
      .catch((err) => {
        setAvatarResponse(
          "Sorry, I am having trouble understanding you right now."
        );
      });
  };

  return (
    <>
    
    <Card w="100%" mt='20px'
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Stack>
<CardHeader> 
  <Button variant='solid' colorScheme='blue'  onClick={startListening}  _hover={{
            bg: "green.500",
          }}>
      {isListening ? "Listening..." : "Start Conversation"}
      </Button>
      </CardHeader>

    <CardBody>
      <Heading w='100%' size='md'>You: <Text fontSize='25px' color="green.500">{transcript}</Text>
      </Heading>
      <Heading w='100%' size='md' mt='20px'>Answer:  <Text py='2' color="blue.500">
      {avatarResponse}
      </Text>
      </Heading>
    </CardBody>
  </Stack>
</Card>
    </>
  );
};

export default Chatbot;



// ${process.env.API_KEY}