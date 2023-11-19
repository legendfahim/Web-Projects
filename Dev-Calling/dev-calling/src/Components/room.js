import React, { useEffect, useRef } from "react";
import { useParams, useLocation} from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useState } from "react";

const RoomPage = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const myMeetingRef = useRef(null);
  const [mode, setMode] = useState(ZegoUIKitPrebuilt.OneONoneCall);

  useEffect(() => {
    const userName = location.state && location.state.userName;
    if (userName) {
      const appID = 1603168998;
      const serverSecret = "146b2f00bebafa8cbf987e2ce384c914";

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        userName
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: myMeetingRef.current,
        scenario: {
          mode: mode,
          showScreenSharingButton: true,
          // turnOnMicrophoneWhenJoining: true,
          // turnOnCameraWhenJoining: true,
          // showMyCameraToggleButton: true,
          // showMyMicrophoneToggleButton: true,
          // showAudioVideoSettingsButton: true,
          // showTextChat: true,
          // showUserList: true,
          // maxUsers: 2,
          // layout: "Auto",
          // showLayoutButton: false,
        },
        showScreenSharingButton: true,
      });
    }
  }, [location.state, roomId, mode]);

  useEffect(() => {
    if (location.pathname.includes("one-to-one-call")) {
      setMode(ZegoUIKitPrebuilt.OneONoneCall);
    } else if (location.pathname.includes("group-call")) {
      setMode(ZegoUIKitPrebuilt.Group);
    }
  }, [location]);

  return (
    <div>
      <div ref={myMeetingRef} />
      {/* <button className="btn btn-primary btn-block bg-warning">
        <Link
          to="/"
          className="nav-link active "
          aria-current="page"
        >
          Back To Home
        </Link>
      </button> */}
    </div>
  );
};

export default RoomPage;