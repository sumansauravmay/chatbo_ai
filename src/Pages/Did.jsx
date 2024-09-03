import React from "react";
import { Button, Center } from "@chakra-ui/react";

const Did = () => {
  const handleclick = () => {
    let options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Basic ${process.env.did_apiKey}`,
      },
      body: JSON.stringify({
        source_url: "https://i.postimg.cc/bYWmwGDp/My-pic2.jpg",
        script: {
          type: "text",
          input:
            "DID Avatar in this context would refer to the visual or graphical representation associated with a DID. It's essentially an avatar tied to a decentralized identity, which could be used across various decentralized applications (dApps) and platforms to represent the user.",
          provider: {
            type: "microsoft",
            voice_id: "Sara",
            voice_config: {
              style: "Cheerful",
            },
          },
        },
        config: { stitch: "true" },
        webhook: "https://host.domain.tld/to/webhook",
      }),
    };

    const options2 = {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Basic ${process.env.did_apiKey}`,
      },
    };

    fetch("https://api.d-id.com/talks", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return fetch(`https://api.d-id.com/talks/${response.id}`, options2)
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.error(err));
  };

  return (
    <Center>
      <Button mt="50px" colorScheme="teal" size="lg" onClick={handleclick}>
        Generate Avatar
      </Button>
    </Center>
  );
};

export default Did;



// ${process.env.did_apiKey}


