import { ServerVideoSource } from "../ServerMedia/ServerVideoSource";
export const VideoPlayer = ({ src, autoPlay = false }) => {
  return (
    <video controls autoPlay={autoPlay} className="w-100">
      <ServerVideoSource src={src} />
    </video>
  );
};
