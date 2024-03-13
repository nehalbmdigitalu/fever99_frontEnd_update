import React, { useEffect } from "react";
import DailyIframe from "@daily-co/daily-js";
import { DailyProvider, useDaily } from "@daily-co/daily-react";
import { RecoilRoot } from "recoil";

function VideoChat() {
  const callObject = DailyIframe.createCallObject({
    showLeaveButton: true,
    iframeStyle: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
    },
  });

  useEffect(() => {
    // Join the room using the specified URL
    const roomUrl = "https://fever99.daily.co/Consult";
    callObject.join({ url: roomUrl });
  }, [callObject]);

  //   const { leave } = useDaily();

  //   const handleLeave = () => {
  //     leave(); // Trigger the leave action
  //   };

  return (
    <>
      {/* <div className="page-wrapper"> */}
        {/* <div className="content"> */}
          <RecoilRoot>
            <DailyProvider callObject={callObject}>
              {/* <button onClick={handleLeave}>Leave</button> */}
            </DailyProvider>
          </RecoilRoot>
        {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default VideoChat;
