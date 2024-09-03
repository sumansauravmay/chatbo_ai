import { Button, Stack, Text, Heading, Box, Center } from "@chakra-ui/react";
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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.API_KEY}`,
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
    <Box mt="50px" w="80%">
      <Center>
        <Button
          bg="red.500"
          color={"white"}
          _hover={{
            bg: "green.500",
          }}
          onClick={startListening}
        >
          {isListening ? "Listening..." : "Start Conversation"}
        </Button>
      </Center>
      <Stack mt="20px">
        <Heading mt="20px">
          You:
          <Text fontSize="20px" color="green.500">
            {transcript}
          </Text>
        </Heading>
        <Heading mt="20px" w="100%">
          Answer:
          <Text fontSize="20px" color="blue.500">
            <pre>{avatarResponse}</pre>
          </Text>
        </Heading>
      </Stack>
    </Box>
  );
};

export default Chatbot;



// ${process.env.API_KEY}