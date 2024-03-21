// Connect to the server using Socket.IO
const socket = io();

// Get HTML elements
const userAudio = document.getElementById("user-audio");
let videoChatForm = document.getElementById("video-chat-form");
let videoChatRooms = document.getElementById("video-chat-rooms");
let userVideo = document.getElementById("user-video");
let peerVideo = document.getElementById("peer-video");
let roomInput = document.getElementById("roomName");
let join = document.getElementById("join");

// Initialize variables
let roomName = roomInput.value; // Default room name
let creator = false; // Flag to track if the user created the room
let userStream;
let rtcPeerConnection; // RTCPeerConnection object
//ICE Servers
const iceServers = {
  iceServers: [
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun.services.mozilla.com" },
  ],
};
// Event listener for the "Join" button
join.addEventListener("click", (e) => {
  // Check if the room name input is empty
  if (roomInput.value == "") {
    alert("Empty Name"); // Show alert if the room name is empty
  } else {
    roomName = roomInput.value; // Update the room name
    socket.emit("room-name", roomName); // Send the room name to the server
  }
});

// Function to access user's media devices (camera and microphone)

// Event listener for "created" event from the server
socket.on("created", () => {
  creator = true; // Set creator flag to true
  userMedia(); // Access user's media devices
});

// Event listener for "joined" event from the server
socket.on("joined", () => {
  creator = true; // Set creator flag to true
  userMedia(); // Access user's media devices
});

// Event listener for "full" event from the server
socket.on("full", () => {
  alert("Room is Full you can't join now!"); // Show alert when the room is full
});

// Event listeners for signaling events (not implemented yet)
socket.on("ready", () => {
  if (creator) {
    rtcPeerConnection = new RTCPeerConnection(iceServers); // Create a new RTCPeerConnection
    rtcPeerConnection.onicecandidate = onIceCandidate;
    rtcPeerConnection.ontrack = ontrackFunction;
    rtcPeerConnection.addTrack(userStream.getTracks()[0], userStream);
    rtcPeerConnection.addTrack(userStream.getTracks()[1], userStream);
    rtcPeerConnection.createOffer(
      function (offer) {
        rtcPeerConnection.setLocalDescription(offer); // Set local description for the offer
        socket.emit("offer", offer, roomName); // Send offer to the server
      },
      function (err) {
        console.log(err);
      }
    );
  }
});
socket.on("offer", (offer) => {
  if (!creator) {
    rtcPeerConnection = new RTCPeerConnection(iceServers);
    rtcPeerConnection.onicecandidate = onIceCandidate;
    rtcPeerConnection.ontrack = ontrackFunction;
    rtcPeerConnection.addTrack(userStream.getTracks()[0], userStream);
    rtcPeerConnection.addTrack(userStream.getTracks()[1], userStream);
    rtcPeerConnection
      .setRemoteDescription(offer)
      .then(() => {
        rtcPeerConnection
          .createAnswer()
          .then((answer) => {
            rtcPeerConnection
              .setLocalDescription(answer)
              .then(() => {
                socket.emit("answer", answer, roomName);
              })
              .catch((error) => {
                console.error("Failed to set local description:", error);
              });
          })
          .catch((error) => {
            console.error("Failed to create answer:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to set remote description:", error);
      });
  }
});

socket.on("candidate", (candidate) => {
  let iceCandidate = new RTCIceCandidate(candidate);
  if (rtcPeerConnection && rtcPeerConnection.remoteDescription) {
    rtcPeerConnection.addIceCandidate(iceCandidate).catch((error) => {
      console.error("Error adding ICE candidate:", error);
    });
  } else {
    console.warn("Ignoring ICE candidate: remote description is not set yet");
  }
});

socket.on("answer", (answer) => {
  rtcPeerConnection
    .setRemoteDescription(answer)
    .then(() => {
      console.log("Remote description set successfully");
    })
    .catch((error) => {
      console.error("Error setting remote description:", error);
    });
});

//All Functions

//getUserMedia Function
const userMedia = () => {
  // Check if getUserMedia is supported by the browser
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  // Request access to video and audio
  navigator.getUserMedia(
    {
      video: true,
      audio: true,
    },
    function (stream) {
      userStream = stream;
      // Set the user's video element to display their stream
      userVideo.srcObject = stream;
      // userAudio.srcObject = stream;

      // When the video metadata is loaded, hide the video chat form and play the user's video
      userVideo.onloadedmetadata = (e) => {
        videoChatForm.style.display = "none"; // Hide the video chat form
        userVideo.play(); // Play the user's video
      };
      // Play the user's audio
      userAudio.play();
      socket.emit("ready", roomName);
    },
    function (err) {
      console.log(err); // Log any errors to the console
      alert("Internal Error"); // Show an alert for internal errors
    }
  );
};
//onicecandidate Function
const onIceCandidate = (event) => {
  if (event.candidate) {
    socket.emit("candidate", event.candidate, roomName);
  }
};
//ontrack Function
const ontrackFunction = (event) => {
  peerVideo.srcObject = event.streams[0];
  peerVideo.onloadedmetadata = (e) => {
    peerVideo.play();
  };
};
