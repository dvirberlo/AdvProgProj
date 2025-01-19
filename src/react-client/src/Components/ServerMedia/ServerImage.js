import { WebServerURL } from "../../Constants/http";

export const ServerImage = ({ src, ...props }) => {
  return <img src={`${WebServerURL}/${src}`} {...props} hi="bye" />;
};
