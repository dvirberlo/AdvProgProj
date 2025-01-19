import { WebServerURL } from "../../Constants/http";

export const ServerVideoSource = ({ src, ...props }) => {
  return <source src={`${WebServerURL}/${src}`} {...props} />;
};
